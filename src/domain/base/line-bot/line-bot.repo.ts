import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { LineBot } from './line-bot.domain';
import { LineBotMapper } from './line-bot.mapper';

@Injectable()
export class LineBotRepo extends BaseRepo {
  async create(lineBot: LineBot): Promise<void> {
    await this.db
      .insertInto('line_bots')
      .values(LineBotMapper.toPg(lineBot))
      .execute();
  }

  async update(id: string, lineBot: LineBot): Promise<void> {
    const data = diff(lineBot.pgState, LineBotMapper.toPg(lineBot));
    if (!data) return;
    await this.db
      .updateTable('line_bots')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<LineBot | null> {
    const lineBotPg = await this.readDb
      .selectFrom('line_bots')
      .selectAll()
      .where('id', '=', id)
      .limit(1)
      .executeTakeFirst();

    if (!lineBotPg) return null;

    return LineBotMapper.fromPgWithState(lineBotPg);
  }

  async delete(id: string): Promise<void> {
    await this.db.deleteFrom('line_bots').where('id', '=', id).execute();
  }
}
