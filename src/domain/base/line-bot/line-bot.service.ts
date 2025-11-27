import { Injectable } from '@nestjs/common';

import { LineBot } from './line-bot.domain';
import { LineBotMapper } from './line-bot.mapper';
import { LineBotRepo } from './line-bot.repo';

@Injectable()
export class LineBotService {
  constructor(private repo: LineBotRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(lineBot: LineBot) {
    this._validate(lineBot);
    if (!lineBot.isPersist) {
      await this.repo.create(lineBot);
    } else {
      await this.repo.update(lineBot.id, lineBot);
    }

    lineBot.setPgState(LineBotMapper.toPg);
  }

  async saveBulk(lineBots: LineBot[]) {
    return Promise.all(lineBots.map((bot) => this.save(bot)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private _validate(_lineBot: LineBot) {
    // validation rules can be added here
  }
}
