import { Injectable } from '@nestjs/common';

import { DOMAIN_EVENT_JOBS } from '@app/worker/worker.job';
import { QUEUE } from '@app/worker/worker.queue';

import { BaseQueue } from '@shared/task/task.abstract';

import { SampleData } from './domain-event.queue.type';

@Injectable()
export class DomainEventQueue extends BaseQueue {
  queueName = QUEUE.DOMAIN_EVENT;

  addJobSample(email: string) {
    const payload: SampleData = { key: email };

    this.addJob(DOMAIN_EVENT_JOBS.SAMPLE, payload);
  }
}
