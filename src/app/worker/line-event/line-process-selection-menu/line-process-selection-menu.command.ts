import { LineProcessSelectionMenuJobData } from '@domain/orchestration/queue/line-event/line-event.queue.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineProcessSelectionMenuCommand {
  async exec(_body: LineProcessSelectionMenuJobData) {
    // verify logic
  }
}
