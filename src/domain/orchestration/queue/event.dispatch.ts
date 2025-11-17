import { User } from '@domain/base/user/user.domain';
import { Injectable } from '@nestjs/common';

import { DomainEventQueue } from './domain-event/domain-event.queue';

@Injectable()
export class EventDispatch {
  constructor(private domainEventQueue: DomainEventQueue) {}

  signIn(user: User) {
    this.domainEventQueue.addJobSample(user.email);
  }
}
