import { PasswordResetTokenMapper } from '@domain/base/password-reset-token/password-reset-token.mapper';
import { UserMapper } from '@domain/base/user/user.mapper';
import type {
  SendForgotPasswordJobData,
  SendOtpJobData,
} from '@domain/orchestration/queue/domain-event/domain-event.queue.type';
import { ForgotPasswordDispatchEvent } from '@domain/orchestration/queue/event.dispatch.type';
import { Injectable } from '@nestjs/common';

import { DOMAIN_EVENT_JOBS } from '@app/worker/worker.job';

import { BaseTaskHandler } from '@shared/task/task.abstract';
import { QueueTask } from '@shared/task/task.decorator';

import { ForgotPasswordQueueCommand } from './forgot-password/forgot-password.command';
import { SendOtpQueueCommand } from './send-otp/send-otp.command';

@Injectable()
export class DomainEventBullmq extends BaseTaskHandler {
  constructor(
    private sendOtpQueueCommand: SendOtpQueueCommand,
    private forgotPasswordQueueCommand: ForgotPasswordQueueCommand,
  ) {
    super();
  }

  @QueueTask(DOMAIN_EVENT_JOBS.SEND_OTP)
  async processSendOtp(data: SendOtpJobData) {
    return this.sendOtpQueueCommand.exec(UserMapper.fromJsonState(data));
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
