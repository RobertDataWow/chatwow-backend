import { PasswordResetTokenMapper } from '@domain/base/password-reset-token/password-reset-token.mapper';
import { User } from '@domain/base/user/user.domain';
import { UserMapper } from '@domain/base/user/user.mapper';
import { Injectable } from '@nestjs/common';

import { DOMAIN_EVENT_JOBS } from '@app/worker/worker.job';
import { QUEUE } from '@app/worker/worker.queue';

import { BaseQueue } from '@shared/task/task.abstract';

import { ForgotPasswordDispatchEvent } from '../event.dispatch.type';
import { SendForgotPasswordJobData } from './domain-event.queue.type';

@Injectable()
export class DomainEventQueue extends BaseQueue {
  queueName = QUEUE.DOMAIN_EVENT;

  jobSendVerification(user: User) {
    this.addJob(
      DOMAIN_EVENT_JOBS.SEND_VERIFICATION,
      UserMapper.toJsonState(user),
    );
  }

  jobResetPassword(data: ForgotPasswordDispatchEvent) {
    const jobData: SendForgotPasswordJobData = {
      user: UserMapper.toJsonState(data.user),
      passwordResetToken: PasswordResetTokenMapper.toJsonState(
        data.passwordResetToken,
      ),
      plainToken: data.plainToken,
    };

    this.addJob(DOMAIN_EVENT_JOBS.FORGOT_PASSWORD, jobData);
  }
}
