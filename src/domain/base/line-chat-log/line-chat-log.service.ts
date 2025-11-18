import { Injectable } from '@nestjs/common';

import { LineChatLog } from './line-chat-log.domain';
import { LineChatLogMapper } from './line-chat-log.mapper';
import { LineChatLogRepo } from './line-chat-log.repo';

@Injectable()
export class LineChatLogService {
  constructor(private readonly repo: LineChatLogRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(lineChatLog: LineChatLog) {
    this._validate(lineChatLog);

    if (!lineChatLog.isPersist) {
      await this.repo.create(lineChatLog);
    } else {
      await this.repo.update(lineChatLog.id, lineChatLog);
    }

    lineChatLog.setPgState(LineChatLogMapper.toPg);
  }

  async saveBulk(lineSessions: LineChatLog[]) {
    return Promise.all(lineSessions.map((u) => this.save(u)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private _validate(_lineSession: LineChatLog) {
    // validation rules can be added here
  }
}
