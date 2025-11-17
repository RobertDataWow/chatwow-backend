import { Injectable } from '@nestjs/common';

import { CRON_JOBS } from '@app/worker/worker.job';

import { BaseTaskHandler } from '@shared/task/task.abstract';
import { QueueTask } from '@shared/task/task.decorator';

@Injectable()
export class CronBullmq extends BaseTaskHandler {
  @QueueTask(CRON_JOBS.SAMPLE)
  async processSample() {
    console.log('XXxxxXXXXXXXXX');
    console.log(`Cron Test Proccessed`);
    console.log('XXxxxXXXXXXXXX');
  }
}
