import { Injectable } from '@nestjs/common';

import { EmailService } from '@infra/global/email/email.service';
import TemplateSendOtp from '@infra/global/email/template/template.send-otp';

import { renderHtml } from '@shared/common/common.func';

import type { User } from '../user/user.domain';
import type { UserOtp } from './user-otp.domain';
import { UserOtpMapper } from './user-otp.mapper';
import { UserOtpRepo } from './user-otp.repo';

@Injectable()
export class UserOtpService {
  constructor(
    private repo: UserOtpRepo,
    private emailService: EmailService,
  ) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(userOtp: UserOtp) {
    this._validate(userOtp);

    if (!userOtp.isPersist) {
      await this.repo.create(userOtp);
    } else {
      await this.repo.update(userOtp.id, userOtp);
    }

    userOtp.setPgState(UserOtpMapper.toPg);
  }

  async saveBulk(userOtps: UserOtp[]) {
    return Promise.all(userOtps.map((u) => this.save(u)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async expireAll(userId: string) {
    return this.repo.expireAll(userId);
  }

  async sendOtpMail(user: User, userOtp: UserOtp) {
    const html = await renderHtml(TemplateSendOtp({ userOtp }));
    await this.emailService.send(user.email, 'รหัส Otp', html);

    return userOtp;
  }

  private _validate(_userOtp: UserOtp) {
    // validation rules can be added here
  }
}
