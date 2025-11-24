import {
  LineProcessRawJobData,
  LineSendMessageJobData,
} from '@domain/orchestration/queue/line-event/line-event.queue.type';
import { Injectable } from '@nestjs/common';

import { LINE_EVENT_JOBS } from '@app/worker/worker.job';

import { BaseTaskHandler } from '@shared/task/task.abstract';
import { QueueTask } from '@shared/task/task.decorator';

import { LineProcessRawCommand } from './line-process-raw/line-process-raw.command';
import { LineSendMessageCommand } from './line-send-message/line-send-message.command';

@Injectable()
export class LineEventBullmq extends BaseTaskHandler {
  constructor(
    private lineProcessRawCommand: LineProcessRawCommand,
    private lineSendMessageCommand: LineSendMessageCommand,
  ) {
    super();
  }

  @QueueTask(LINE_EVENT_JOBS.PROCESS_RAW)
  async processRaw(data: LineProcessRawJobData) {
    return this.lineProcessRawCommand.exec(data);
  }

  async sendMessage(data: LineSendMessageJobData) {
    return this.lineSendMessageCommand.exec(data);
  }
}
