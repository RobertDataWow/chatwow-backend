import { Module } from '@nestjs/common';

import { createBullmqHandler } from '@shared/common/common.worker';

import { QUEUE } from '../worker.queue';
import { DomainEventBullmq } from './domain-event.bullmq';
import { ForgotPasswordQueueCommand } from './forgot-password/forgot-password.command';
import { SendVerificationQueueCommand } from './send-verification/send-verification.command';

@Module({
  providers: [
    SendVerificationQueueCommand,
    ForgotPasswordQueueCommand,

    //
    createBullmqHandler(QUEUE.DOMAIN_EVENT, DomainEventBullmq),
  ],
})
export class DomainEventWorkerModule {}
