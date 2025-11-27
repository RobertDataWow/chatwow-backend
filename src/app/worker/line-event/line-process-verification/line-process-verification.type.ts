import { LineMessageMetaData, LineMessageMetaInput } from '../line-event.type';

type Data = {
  replyToken: string;
  verificationCode: string;
};

export type LineProcessVerificationJobData = LineMessageMetaData<Data>;
export type LineProcessVerificationJobInput = LineMessageMetaInput<Data>;
