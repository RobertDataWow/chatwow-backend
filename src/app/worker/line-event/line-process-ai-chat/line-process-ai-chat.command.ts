import { LineProcessAiChatJobData } from '@domain/orchestration/queue/line-event/line-event.queue.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineProcessAiChatCommand {
  async exec(_body: LineProcessAiChatJobData) {
    // verify logic
  }
}
