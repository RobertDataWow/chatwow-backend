import { LineWebHookMessage } from '@infra/global/line/line.type';

export type LineJobData<T> = {
  config: {
    channelAccessToken: string;
    channelSecret: string;
  };
  data: T;
};

export type LineProcessRawJobData = LineJobData<LineWebHookMessage>;
export type LineSendMessageJobData = LineJobData<{
  replyToken: string;
  text: string;
}>;
