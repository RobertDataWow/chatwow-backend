import { User } from '@domain/base/user/user.domain';
import { Injectable } from '@nestjs/common';

import { LineWebHookMessage } from '@infra/global/line/line.type';

import { DomainEventQueue } from './domain-event/domain-event.queue';
import { LineEventQueue } from './line-event/line-event.queue';
import { ForgotPasswordDispatchEvent } from './types/event.dispatch.type';

@Injectable()
export class EventDispatch {
  constructor(
    private domainEventQueue: DomainEventQueue,
    private lineEventQueue: LineEventQueue,
  ) {}

  sendOtp(user: User) {
    this.domainEventQueue.jobSendOtp(user);
  }

  addUser(user: User) {
    this.sendOtp(user);
  }

  resetPassword(data: ForgotPasswordDispatchEvent) {
    this.domainEventQueue.jobResetPassword(data);
  }

  lineMessageReceive(data: LineWebHookMessage) {
    this.lineEventQueue.jobProcessRaw(data);
  }
}
