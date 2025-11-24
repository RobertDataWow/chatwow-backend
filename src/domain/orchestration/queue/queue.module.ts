import { Module } from '@nestjs/common';

import { DomainEventQueue } from './domain-event/domain-event.queue';
import { EventDispatch } from './event.dispatch';
import { LineEventQueue } from './line-event/line-event.queue';

@Module({
  providers: [
    //
    DomainEventQueue,
    EventDispatch,
    LineEventQueue,
  ],
  exports: [EventDispatch, LineEventQueue],
})
export class QueueModule {}
