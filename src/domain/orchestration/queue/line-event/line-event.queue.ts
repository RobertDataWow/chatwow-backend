import { Injectable } from '@nestjs/common';

import { LineWebHookMessage } from '@infra/global/line/line.type';

import { LINE_EVENT_JOBS } from '@app/worker/worker.job';
import { QUEUE } from '@app/worker/worker.queue';

import { BaseQueue } from '@shared/task/task.abstract';

@Injectable()
export class LineEventQueue extends BaseQueue {
  queueName = QUEUE.LINE_EVENT;

  jobProcessRaw(data: LineWebHookMessage) {
    this.addJob(LINE_EVENT_JOBS.PROCESS_RAW, data);
  }
}
