import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { isDefined } from '@shared/common/common.validator';

import { LineBotMapper } from './line-bot.mapper';
import type { LineBotPlain } from './line-bot.type';

export class LineBotFactory {
  static mock(data: Partial<LineBotPlain>) {
    const now = myDayjs().toDate();
    return LineBotMapper.fromPlain({
      id: isDefined(data.id) ? data.id : uuidV7(),
      createdAt: isDefined(data.createdAt) ? data.createdAt : now,
      updatedAt: isDefined(data.updatedAt) ? data.updatedAt : now,
      channelAccessToken: isDefined(data.channelAccessToken)
        ? data.channelAccessToken
        : 'mock_channel_access_token',
      channelSecret: isDefined(data.channelSecret)
        ? data.channelSecret
        : 'mock_channel_secret',
    });
  }

  static mockBulk(amount: number, data: Partial<LineBotPlain>) {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
