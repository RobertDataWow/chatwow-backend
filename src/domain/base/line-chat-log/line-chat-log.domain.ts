import { DomainEntity } from '@shared/common/common.domain';

import type {
  LineChatLogNewData,
  LineChatLogPg,
  LineChatLogPlain,
  LineChatLogUpdateData,
} from './types/line-chat-log.domain.type';

export class LineChatLog extends DomainEntity<LineChatLogPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly lineSessionId: string;
  readonly chatSender: 'USER' | 'BOT';
  readonly message: string;

  constructor(plain: LineChatLogPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: LineChatLogNewData): LineChatLog {
    return new LineChatLog({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data,
    });
  }

  edit(data: LineChatLogUpdateData) {
    Object.assign(this, data);
  }
}
