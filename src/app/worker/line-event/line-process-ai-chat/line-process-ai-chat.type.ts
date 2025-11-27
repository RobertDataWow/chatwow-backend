import { LineMessageMetaData, LineMessageMetaInput } from '../line-event.type';

type Data = {
  message: string;
  replyToken: string;
};

export type LineProcessAiChatJobData = LineMessageMetaData<Data>;
export type LineProcessAiChatJobInput = LineMessageMetaInput<Data>;
