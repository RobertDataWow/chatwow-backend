import { Injectable } from '@nestjs/common';

import { LineService } from '@infra/global/line/line.service';
import {
  LineWebHookMessage,
  LineWebhookEvent,
} from '@infra/global/line/line.type';

import { LINE_INVALID_MESSAGE_REPLY } from '../line-event.constant';
import { LineProcessRawJobData } from './line-process-raw.type';

type MessageType = 'verification' | 'selectionMenu' | 'aiChat';

@Injectable()
export class LineProcessRawCommand {
  async exec(body: LineProcessRawJobData) {
    const lineService = new LineService(body.config);

    const event = body.data.events[0];
    await lineService.showLoading(event.source.userId);

    const isMessageValid = this.checkValidMessage(event);
    if (!isMessageValid) {
      await lineService.reply(event.replyToken, LINE_INVALID_MESSAGE_REPLY);
      return;
    }

    await lineService.reply(event.replyToken, 'สวัสดีครับ');
  }

  async getMessageType(data: LineWebHookMessage): Promise<MessageType> {
    const _event = data.events[0];

    return 'verification';
  }

  processVerification() {}
  processSelectionMenu() {}
  processAiChat() {}

  checkValidMessage(event: LineWebhookEvent) {
    if (!event) {
      return false;
    }

    // only allow text for now
    if (event.message.type !== 'text') {
      return false;
    }

    if (!event.replyToken) {
      return false;
    }

    return true;
  }
}
