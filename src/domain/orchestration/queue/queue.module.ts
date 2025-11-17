import { Module } from '@nestjs/common';

import { DomainEventQueue } from './domain-event/domain-event.queue';
import { EventDispatch } from './event.dispatch';

@Module({
  providers: [
    //
    DomainEventQueue,
    EventDispatch,
  ],
  exports: [EventDispatch],
})
export class QueueModule {}
