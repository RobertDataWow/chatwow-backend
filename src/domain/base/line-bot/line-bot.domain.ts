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
} from './line-bot.type';

export class LineBot extends DomainEntity<LineBotPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly channelAccessToken: string;
  readonly channelSecret: string;

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

  static newBulk(data: LineBotNewData[]) {
    return data.map((d) => LineBot.new(d));
  }

  edit(data: LineBotUpdateData) {
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

    return LineBotMapper.fromPlain(plain);
  }
}
