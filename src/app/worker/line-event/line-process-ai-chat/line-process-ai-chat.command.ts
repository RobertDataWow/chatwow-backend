import { Injectable } from '@nestjs/common';

import { LineService } from '@infra/global/line/line.service';

import { LineProcessAiChatJobData } from './line-process-ai-chat.type';

@Injectable()
export class LineProcessAiChatCommand {
  async exec(body: LineProcessAiChatJobData) {
    const lineService = new LineService(body.lineBot);
    await lineService.reply(body.data.replyToken, 'สำเร็จ');
  }
}
