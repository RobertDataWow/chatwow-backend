import { User } from '@domain/base/user/user.domain';
import { Injectable } from '@nestjs/common';

import { DomainEventQueue } from './domain-event/domain-event.queue';
import { ForgotPasswordDispatchEvent } from './event.dispatch.type';

@Injectable()
export class EventDispatch {
  constructor(private domainEventQueue: DomainEventQueue) {}

  sendVerification(user: User) {
    this.domainEventQueue.jobSendVerification(user);
  }

  addUser(user: User) {
    this.sendVerification(user);
  }

  resetPassword(data: ForgotPasswordDispatchEvent) {
    this.domainEventQueue.jobResetPassword(data);
  }
}
