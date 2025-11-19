import { User } from '@domain/base/user/user.domain';
import { UserMapper } from '@domain/base/user/user.mapper';
import { Injectable } from '@nestjs/common';

import { DOMAIN_EVENT_JOBS } from '@app/worker/worker.job';
import { QUEUE } from '@app/worker/worker.queue';

import { BaseQueue } from '@shared/task/task.abstract';

@Injectable()
export class DomainEventQueue extends BaseQueue {
  queueName = QUEUE.DOMAIN_EVENT;

  jobSendOtp(user: User) {
    this.addJob(DOMAIN_EVENT_JOBS.SEND_OTP, UserMapper.toJsonState(user));
  }
}
