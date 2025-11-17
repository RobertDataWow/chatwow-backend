import { Module } from '@nestjs/common';

import { createBullmqHandler } from '@shared/common/common.worker';

import { QUEUE } from '../worker.queue';
import { DomainEventBullmq } from './domain-event.bullmq';

@Module({
  providers: [
    //
    createBullmqHandler(QUEUE.DOMAIN_EVENT, DomainEventBullmq),
  ],
})
export class DomainEventWorkerModule {}
