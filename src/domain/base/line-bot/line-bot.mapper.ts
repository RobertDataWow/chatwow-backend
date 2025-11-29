import { toDate, toISO } from '@shared/common/common.transformer';

import { LineBot } from './line-bot.domain';
import type { LineBotResponse } from './line-bot.response';
import type {
  LineBotJson,
  LineBotJsonState,
  LineBotPg,
  LineBotPlain,
} from './line-bot.type';

export class LineBotMapper {
  static fromPg(pg: LineBotPg): LineBot {
    const plain: LineBotPlain = {
      id: pg.id,
      createdAt: toDate(pg.created_at),
      updatedAt: toDate(pg.updated_at),
      channelAccessToken: pg.channel_access_token,
      channelSecret: pg.channel_secret,
    };
    return new LineBot(plain);
  }

  static fromPgWithState(pg: LineBotPg): LineBot {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plain: LineBotPlain): LineBot {
    return new LineBot({
      id: plain.id,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
      channelAccessToken: plain.channelAccessToken,
      channelSecret: plain.channelSecret,
    });
  }

  static fromJson(json: LineBotJson): LineBot {
    const plain: LineBotPlain = {
      id: json.id,
      createdAt: toDate(json.createdAt),
      updatedAt: toDate(json.updatedAt),
      channelAccessToken: json.channelAccessToken,
      channelSecret: json.channelSecret,
    };

    return new LineBot(plain);
  }
  static fromJsonWithState(data: LineBotJsonState): LineBot {
    const lineBot = this.fromJson(data.data);
    lineBot.setPgState(data.state);
    return lineBot;
  }

  static toPg(lineBot: LineBot): LineBotPg {
    return {
      id: lineBot.id,
      created_at: toISO(lineBot.createdAt),
      updated_at: toISO(lineBot.updatedAt),
      channel_access_token: lineBot.channelAccessToken,
      channel_secret: lineBot.channelSecret,
    };
  }

  static toPlain(lineBot: LineBot): LineBotPlain {
    return {
      id: lineBot.id,
      createdAt: lineBot.createdAt,
      updatedAt: lineBot.updatedAt,
      channelAccessToken: lineBot.channelAccessToken,
      channelSecret: lineBot.channelSecret,
    };
  }

  static toResponse(lineBot: LineBot): LineBotResponse {
    return {
      id: lineBot.id,
      createdAt: toISO(lineBot.createdAt),
      updatedAt: toISO(lineBot.updatedAt),
    };
  }

  static toJson(lineBot: LineBot): LineBotJson {
    return {
      id: lineBot.id,
      createdAt: toISO(lineBot.createdAt),
      updatedAt: toISO(lineBot.updatedAt),
      channelAccessToken: lineBot.channelAccessToken,
      channelSecret: lineBot.channelSecret,
    };
  }
  static toJsonWithState(lineBot: LineBot): LineBotJsonState {
    return {
      data: this.toJson(lineBot),
      state: lineBot.pgState,
    };
  }

  static pgToResponse(pg: LineBotPg): LineBotResponse {
    return {
      id: pg.id,
      createdAt: toISO(pg.created_at),
      updatedAt: toISO(pg.updated_at),
    };
  }
}
