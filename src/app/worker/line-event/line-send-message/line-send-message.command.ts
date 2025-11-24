import { LineSendMessageJobData } from '@domain/orchestration/queue/line-event/line-event.queue.type';
import { Injectable } from '@nestjs/common';

import { LineService } from '@infra/global/line/line.service';

@Injectable()
export class LineSendMessageCommand {
  async exec({ config, data }: LineSendMessageJobData) {
    const lineService = new LineService(config);
    await lineService.reply(data.replyToken, data.text);
  }
}
