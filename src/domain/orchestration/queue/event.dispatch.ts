import { Injectable } from '@nestjs/common';

import { DomainEventQueue } from './domain-event/domain-event.queue';

@Injectable()
export class EventDispatch {
  constructor(private domainEventQueue: DomainEventQueue) {}

  signIn(user: { email: string }) {
    this.domainEventQueue.addJobSample(user.email);
  }
}
