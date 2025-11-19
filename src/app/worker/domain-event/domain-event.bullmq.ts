import { UserMapper } from '@domain/base/user/user.mapper';
import type { SendOtpJobData } from '@domain/orchestration/queue/domain-event/domain-event.queue.type';
import { Injectable } from '@nestjs/common';

import { DOMAIN_EVENT_JOBS } from '@app/worker/worker.job';

import { BaseTaskHandler } from '@shared/task/task.abstract';
import { QueueTask } from '@shared/task/task.decorator';

import { SendOtpCommand } from './send-otp/send-otp.command';

@Injectable()
export class DomainEventBullmq extends BaseTaskHandler {
  constructor(private sendOtpCommand: SendOtpCommand) {
    super();
  }

  @QueueTask(DOMAIN_EVENT_JOBS.SEND_OTP)
  async processSendOtp(data: SendOtpJobData) {
    return this.sendOtpCommand.exec(UserMapper.fromJsonState(data));
  }
}
