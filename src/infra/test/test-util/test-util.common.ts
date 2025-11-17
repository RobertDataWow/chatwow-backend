import { DomainModule } from '@domain/domain.module';
import type {
  DynamicModule,
  INestApplication,
  Provider,
  Type,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import type { TestingModule, TestingModuleBuilder } from '@nestjs/testing';
import { Test } from '@nestjs/testing';
import type { Dayjs } from 'dayjs';
import type { ControlledTransaction } from 'kysely';

import type { DB } from '@infra/db/db';
import type { CoreDB } from '@infra/db/db.common';
import { KYSELY, runMigrations } from '@infra/db/db.common';
import { DBModule } from '@infra/db/db.module';
import { GlobalModule } from '@infra/global/global.module';
import { TransactionService } from '@infra/global/transaction/transaction.service';
import { MiddlewareModule } from '@infra/middleware/middleware.module';

import { CliModule } from '@app/cli/cli.module';

import { getConfigOptions } from '@shared/common/common.dotenv';
import { setupApp } from '@shared/http/http.setup';

import { InitialsCliSeed } from '../../../app/cli/initials/initials.cli.seed';
import { MockTransactionService } from '../mock/mock.trasaction.service';
import { getTestState, updateTestState } from './test-state.common';

export async function setupAppForTest(testModule: TestingModule) {
  const app = testModule.createNestApplication();

  setupApp(app);

  await app.init();

  return app;
}

export async function createRepoTestingModule(repo: Provider) {
  const module = await Test.createTestingModule({
    providers: [
      repo,
      TransactionService,
      {
        provide: KYSELY,
        useFactory: async () => {
          return globalThis.dataSource;
        },
      },
    ],
  }).compile();

  return module;
}

export function createBackendTestingModule(
  testModule: DynamicModule | Type<any>,
): TestingModuleBuilder;
export function createBackendTestingModule(
  testModule: Array<DynamicModule | Type<any>>,
): TestingModuleBuilder;
export function createBackendTestingModule(
  testModule: DynamicModule | Type<any> | Array<DynamicModule | Type<any>>,
) {
  const testModules = Array.isArray(testModule) ? testModule : [testModule];

  const module = Test.createTestingModule({
    imports: [
      ConfigModule.forRoot(getConfigOptions()),

      DBModule,
      GlobalModule,
      DomainModule,
      MiddlewareModule,
      CliModule,
      ...testModules,
    ],
  })
    .overrideProvider(TransactionService)
    .useClass(MockTransactionService);

  return module;
}

export function freezeTestTime(current: Dayjs) {
  jest.useFakeTimers().setSystemTime(current.toDate());
}

export async function startE2e(module: TestingModule) {
  const app = module.createNestApplication();
  setupApp(app);
  await app.init();

  const { requireDbSetup } = getTestState();

  if (requireDbSetup) {
    await runMigrations(app.get(KYSELY));
    await app.get(InitialsCliSeed).run([]);
    updateTestState({ requireDbSetup: false });
  }

  return app;
}

export async function stopE2e(app: INestApplication<any>) {
  await testTransactionRollback(app);
  await app.close();

  return;
}

// type SeededUser = 'superadmin' | 'general';
// export async function getBaseTestHeader(
//   app: INestApplication<any>,
//   user: SeededUser = 'superadmin',
// ): Promise<Record<string, string>> {
//   const res = await request(app.getHttpServer())
//     .post('/v1/auths/sign-in')
//     .send({
//       email: `${user}@example.com`,
//       password: 'password',
//     });

//   const body: SignInV1Response = res.body;
//   const token = body.data.token;

//   return {
//     authorization: `Bearer ${token}`,
//   };
// }

export async function testTransactionStart(app: INestApplication<any>) {
  const transactionService = app.get(TransactionService);
  const db: CoreDB = app.get(KYSELY);

  const trx = await db.startTransaction().execute();
  transactionService.$setTransaction(trx);

  return;
}

export async function testTransactionRollback(app: INestApplication<any>) {
  const transactionService = app.get(TransactionService);
  const trx: ControlledTransaction<DB> = transactionService.$getTransaction();
  if (!trx) {
    return;
  }

  await trx.rollback().execute();

  return;
}
