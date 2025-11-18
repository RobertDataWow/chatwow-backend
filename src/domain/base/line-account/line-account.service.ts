import { Injectable } from '@nestjs/common';

import { LineAccount } from './line-account.domain';
import { LineAccountMapper } from './line-account.mapper';
import { LineAccountRepo } from './line-account.repo';

@Injectable()
export class LineAccountService {
  constructor(private repo: LineAccountRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(lineAccount: LineAccount) {
    this._validate(lineAccount);
    if (!lineAccount.isPersist) {
      await this.repo.create(lineAccount);
    } else {
      await this.repo.update(lineAccount.id, lineAccount);
    }

    lineAccount.setPgState(LineAccountMapper.toPg);
  }

  async saveBulk(lineAccounts: LineAccount[]) {
    return Promise.all(lineAccounts.map((u) => this.save(u)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private _validate(_lineAccount: LineAccount) {
    // validation rules can be added here
  }
}
