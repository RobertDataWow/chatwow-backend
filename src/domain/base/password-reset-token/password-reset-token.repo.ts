import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { PasswordResetToken } from './password-reset-token.domain';
import { PasswordResetTokenMapper } from './password-reset-token.mapper';

@Injectable()
export class PasswordResetTokenRepo extends BaseRepo {
  async create(token: PasswordResetToken): Promise<void> {
    await this.db
      .insertInto('password_reset_tokens')
      .values(PasswordResetTokenMapper.toPg(token))
      .execute();
  }

  async update(id: string, token: PasswordResetToken): Promise<void> {
    const data = diff(token.pgState, PasswordResetTokenMapper.toPg(token));

    if (!data) return;
    await this.db
      .updateTable('password_reset_tokens')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<PasswordResetToken | null> {
    const pg = await this.readDb
      .selectFrom('password_reset_tokens')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!pg) return null;

    return PasswordResetTokenMapper.fromPgWithState(pg);
  }

  async delete(id: string): Promise<void> {
    await this.db
      .deleteFrom('password_reset_tokens')
      .where('id', '=', id)
      .execute();
  }
}
