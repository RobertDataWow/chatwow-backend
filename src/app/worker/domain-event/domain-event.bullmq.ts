import type { SampleData } from '@domain/orchestration/queue/domain-event/domain-event.queue.type';
import { Injectable } from '@nestjs/common';

import { DOMAIN_EVENT_JOBS } from '@app/worker/worker.job';

import { BaseTaskHandler } from '@shared/task/task.abstract';
import { QueueTask } from '@shared/task/task.decorator';

@Injectable()
export class DomainEventBullmq extends BaseTaskHandler {
  @QueueTask(DOMAIN_EVENT_JOBS.SAMPLE)
  async processSample(data: SampleData) {
    console.log('==================================');
    console.log(`User login: ${data.key}`);
    console.log('==================================');
  }
}
