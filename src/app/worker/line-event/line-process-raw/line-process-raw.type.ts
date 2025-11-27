import {
  LineWebHookMessage,
  LineWebhookEvent,
} from '@infra/global/line/line.type';

import { LineBaseJobConfig } from '../line-event.type';

export type LineProcessRawJobData = {
  lineBotId: string;
  config: LineBaseJobConfig;
  data: LineWebHookMessage;
};
export type ProcessByMessageTypeOpts = {
  config: LineBaseJobConfig;
  event: LineWebhookEvent;
};
