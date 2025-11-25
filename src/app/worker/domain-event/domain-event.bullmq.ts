import { PasswordResetTokenMapper } from '@domain/base/password-reset-token/password-reset-token.mapper';
import { UserMapper } from '@domain/base/user/user.mapper';
import type {
  SendForgotPasswordJobData,
  SendVerificationJobData,
} from '@domain/orchestration/queue/domain-event/domain-event.queue.type';
import { ForgotPasswordDispatchEvent } from '@domain/orchestration/queue/event.dispatch.type';
import { Injectable } from '@nestjs/common';

import { DOMAIN_EVENT_JOBS } from '@app/worker/worker.job';

import { BaseTaskHandler } from '@shared/task/task.abstract';
import { QueueTask } from '@shared/task/task.decorator';

import { ForgotPasswordQueueCommand } from './forgot-password/forgot-password.command';
import { SendVerificationQueueCommand } from './send-verification/send-verification.command';

@Injectable()
export class DomainEventBullmq extends BaseTaskHandler {
  constructor(
    private senVerificationQueueCommand: SendVerificationQueueCommand,
    private forgotPasswordQueueCommand: ForgotPasswordQueueCommand,
  ) {
    super();
  }

  @QueueTask(DOMAIN_EVENT_JOBS.SEND_VERIFICATION)
  async processSendVerification(data: SendVerificationJobData) {
    return this.senVerificationQueueCommand.exec(
      UserMapper.fromJsonState(data),
    );
  }

  @QueueTask(DOMAIN_EVENT_JOBS.FORGOT_PASSWORD)
  async processForgotPassword(data: SendForgotPasswordJobData) {
    const dispatchData: ForgotPasswordDispatchEvent = {
      user: UserMapper.fromJsonState(data.user),
      passwordResetToken: PasswordResetTokenMapper.fromJsonState(
        data.passwordResetToken,
      ),
      plainToken: data.plainToken,
    };

    return this.forgotPasswordQueueCommand.exec(dispatchData);
  }
}
