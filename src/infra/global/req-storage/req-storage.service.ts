import { Injectable } from '@nestjs/common';
import { AsyncLocalStorage } from 'async_hooks';

import { ApiException } from '@shared/http/http.exception';

import type { ReqData } from './req-storage.common';

@Injectable()
export class ReqStorage {
  private _localStorage = new AsyncLocalStorage<ReqData>();

  run<T>(trx: any, fn: () => T) {
    return this._localStorage.run(trx, fn);
  }

  get() {
    const ctx = this._localStorage.getStore();
    if (!ctx) {
      throw new ApiException(500, 'ctxMissing');
    }

    return ctx;
  }
}
