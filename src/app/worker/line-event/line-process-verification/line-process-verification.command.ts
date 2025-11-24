import { LineProcessVerificationJobData } from '@domain/orchestration/queue/line-event/line-event.queue.type';
import { Injectable } from '@nestjs/common';

@Injectable()
export class LineProcessVerificationCommand {
  async exec(_body: LineProcessVerificationJobData) {
    // verify logic
  }
}
