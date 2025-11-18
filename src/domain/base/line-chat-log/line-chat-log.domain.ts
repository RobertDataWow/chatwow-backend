import type { ChatSender } from '@infra/db/db';

import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';

import { LineChatLogMapper } from './line-chat-log.mapper';
import type {
  LineChatLogNewData,
  LineChatLogPg,
  LineChatLogPlain,
} from './types/line-chat-log.domain.type';

export class LineChatLog extends DomainEntity<LineChatLogPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly lineSessionId: string;
  readonly chatSender: ChatSender;
  readonly message: string;

  constructor(plain: LineChatLogPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: LineChatLogNewData): LineChatLog {
    return LineChatLogMapper.fromPlain({
      id: uuidV7(),
      createdAt: myDayjs().toDate(),
      chatSender: data.chatSender,
      lineSessionId: data.lineSessionId,
      message: data.message,
    });
  }
}
