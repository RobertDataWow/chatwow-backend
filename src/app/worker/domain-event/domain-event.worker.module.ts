import { Module } from '@nestjs/common';

import { createBullmqHandler } from '@shared/common/common.worker';

import { QUEUE } from '../worker.queue';
import { DomainEventBullmq } from './domain-event.bullmq';
import { ForgotPasswordQueueCommand } from './forgot-password/forgot-password.command';
import { SendOtpQueueCommand } from './send-otp/send-otp.command';

@Module({
  providers: [
    SendOtpQueueCommand,
    ForgotPasswordQueueCommand,

    //
    createBullmqHandler(QUEUE.DOMAIN_EVENT, DomainEventBullmq),
  ],
})
export class DomainEventWorkerModule {}
