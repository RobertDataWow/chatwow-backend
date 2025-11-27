import { LineMessageMetaData, LineMessageMetaInput } from '../line-event.type';

type Data = {
  lineAccountId: string;
  message: string;
  replyToken: string;
};
export type LineProcessSelectionMenuJobData = LineMessageMetaData<Data>;
export type LineProcessSelectionMenuJobInput = LineMessageMetaInput<Data>;
