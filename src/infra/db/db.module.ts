import { Global, Inject, Module, OnModuleDestroy } from '@nestjs/common';

import { CoreDB, KYSELY } from './db.common';
import { MainDb } from './db.main';
import { KyselyProvider, ReplicaKyselyProvider } from './db.provider';
import { TransactionService } from './transaction/transaction.service';

@Global()
@Module({
  providers: [
    KyselyProvider,
    ReplicaKyselyProvider,
    MainDb,
    TransactionService,
  ],
  exports: [MainDb, TransactionService],
})
export class DBModule implements OnModuleDestroy {
  constructor(@Inject(KYSELY) private readonly db: CoreDB) {}

  async onModuleDestroy() {
    await this.db.destroy();
  }
}
