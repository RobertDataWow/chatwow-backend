import type { LineBot } from '@domain/base/line-bot/line-bot.domain';
import { LineBotJsonState } from '@domain/base/line-bot/types/line-bot.domain.type';
import type { LineSession } from '@domain/base/line-session/line-session.domain';
import { LineSessionJsonState } from '@domain/base/line-session/types/line-session.domain.type';

export type LineBaseJobConfig = {
  channelAccessToken: string;
  channelSecret: string;
};

export type LineMessageMetaData<T> = {
  lineBot: LineBot;
  lineSession: LineSession;
  data: T;
};
export type LineMessageMetaInput<T> = {
  lineBotJsonState: LineBotJsonState;
  lineSessionJsonState: LineSessionJsonState;
  data: T;
};
