import { Inject, Injectable } from '@nestjs/common';

import { CoreDB, KYSELY, READ_DB, ReadDB, WriteDB } from './db.common';
import { TransactionService } from './transaction/transaction.service';

@Injectable()
export class MainDb {
  constructor(
    @Inject(KYSELY)
    private _coreDb: CoreDB,
    @Inject(READ_DB)
    private _db: ReadDB,
    private transactionService: TransactionService,
  ) {}

  get write(): WriteDB {
    let mainDb: CoreDB = this._currentTransaction() as unknown as CoreDB;
    if (!mainDb) {
      mainDb = this._coreDb;
    }

    return mainDb;
  }

  get read(): ReadDB {
    let read: ReadDB = this._currentTransaction() as unknown as CoreDB;
    if (!read) {
      read = this._db;
    }

    return read;
  }

  private _currentTransaction() {
    return this.transactionService.$getTransaction();
  }
}
