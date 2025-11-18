import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { LineChatLog } from './line-chat-log.domain';
import { LineChatLogMapper } from './line-chat-log.mapper';

@Injectable()
export class LineChatLogRepo extends BaseRepo {
  async create(domain: LineChatLog): Promise<void> {
    await this.db
      //
      .insertInto('line_chat_logs')
      .values(LineChatLogMapper.toPg(domain))
      .execute();
  }

  async update(id: string, domain: LineChatLog): Promise<void> {
    const data = diff(domain.pgState, LineChatLogMapper.toPg(domain));
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('line_chat_logs')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<LineChatLog | null> {
    const userPg = await this.readDb
      .selectFrom('line_chat_logs')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!userPg) {
      return null;
    }

    const domain = LineChatLogMapper.fromPgWithState(userPg);
    return domain;
  }

  async delete(id: string): Promise<void> {
    await this.db
      //
      .deleteFrom('line_chat_logs')
      .where('id', '=', id)
      .execute();
  }
}
