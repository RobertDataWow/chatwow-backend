import { Injectable } from '@nestjs/common';

import { LineWebHookMessage } from '@infra/global/line/line.type';

import { LINE_EVENT_JOBS } from '@app/worker/worker.job';

import { BaseTaskHandler } from '@shared/task/task.abstract';
import { QueueTask } from '@shared/task/task.decorator';

import { ProcessRawLineCommand } from './process-raw-line/process-raw-line.command';

@Injectable()
export class LineEventBullmq extends BaseTaskHandler {
  constructor(private processRawLineCommand: ProcessRawLineCommand) {
    super();
  }

  @QueueTask(LINE_EVENT_JOBS.PROCESS_RAW)
  async processRawLine(data: LineWebHookMessage) {
    return this.processRawLineCommand.exec(data);
  }
}
