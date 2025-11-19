import { Module } from '@nestjs/common';

import { createBullmqHandler } from '@shared/common/common.worker';

import { QUEUE } from '../worker.queue';
import { DomainEventBullmq } from './domain-event.bullmq';
import { SendOtpCommand } from './send-otp/send-otp.command';

@Module({
  providers: [
    SendOtpCommand,

    //
    createBullmqHandler(QUEUE.DOMAIN_EVENT, DomainEventBullmq),
  ],
})
export class DomainEventWorkerModule {}
