import { Module } from '@nestjs/common';

import { createBullmqHandler } from '@shared/common/common.worker';

import { QUEUE } from '../worker.queue';
import { CronBullmq } from './cron.bullmq';

@Module({
  providers: [createBullmqHandler(QUEUE.CRONS, CronBullmq)],
})
export class CronWorkerModule {}
