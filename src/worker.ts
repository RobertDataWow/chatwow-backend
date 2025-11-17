import { NestFactory } from '@nestjs/core';

import { config } from '@infra/config';

import { coreLogger } from '@shared/common/common.logger';
import { createWorker } from '@shared/common/common.worker';

import { AppWorkerModule } from './app/app.module';

const workerPort = config().app.workerPort;
const appConfig = config().app;

async function bootstrap() {
  const app = await NestFactory.create(AppWorkerModule, {
    logger: coreLogger(appConfig),
  });
  createWorker(app);

  app.enableShutdownHooks();

  await app.listen(workerPort);
}
bootstrap();
