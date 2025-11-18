import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { LineAccount } from './line-account.domain';
import { LineAccountMapper } from './line-account.mapper';

@Injectable()
export class LineAccountRepo extends BaseRepo {
  async create(lineAccount: LineAccount): Promise<void> {
    await this.db
      .insertInto('line_accounts')
      .values(LineAccountMapper.toPg(lineAccount))
      .execute();
  }

  async update(id: string, lineAccount: LineAccount): Promise<void> {
    const data = diff(lineAccount.pgState, LineAccountMapper.toPg(lineAccount));
    if (!data) return;
    await this.db
      .updateTable('line_accounts')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<LineAccount | null> {
    const lineAccountPg = await this.readDb
      .selectFrom('line_accounts')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!lineAccountPg) return null;

    return LineAccountMapper.fromPg(lineAccountPg);
  }

  async delete(id: string): Promise<void> {
    await this.db.deleteFrom('line_accounts').where('id', '=', id).execute();
  }
}
