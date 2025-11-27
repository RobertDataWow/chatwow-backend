import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import { LineBotMapper } from './line-bot.mapper';
import type {
  LineBotNewData,
  LineBotPg,
  LineBotPlain,
  LineBotUpdateData,
} from './types/line-bot.domain.type';

export class LineBot extends DomainEntity<LineBotPg> {
  readonly id: string;
  readonly createdAt: Date;
  updatedAt: Date;
  channelAccessToken: string;
  channelSecret: string;

  constructor(plain: LineBotPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: LineBotNewData): LineBot {
    const now = myDayjs().toDate();
    return LineBotMapper.fromPlain({
      id: uuidV7(),
      createdAt: now,
      updatedAt: now,
      channelAccessToken: data.channelAccessToken,
      channelSecret: data.channelSecret,
    });
  }

  update(data: LineBotUpdateData): void {
    const plain: LineBotPlain = {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: myDayjs().toDate(),

      //
      channelAccessToken: isDefined(data.channelAccessToken)
        ? data.channelAccessToken
        : this.channelAccessToken,
      channelSecret: isDefined(data.channelSecret)
        ? data.channelSecret
        : this.channelSecret,
    };

    Object.assign(this, plain);
  }
}
