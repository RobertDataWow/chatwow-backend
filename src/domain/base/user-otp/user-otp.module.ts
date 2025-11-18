import { Module } from '@nestjs/common';

import { UserOtpRepo } from './user-otp.repo';
import { UserOtpService } from './user-otp.service';

@Module({
  providers: [UserOtpRepo, UserOtpService],
  exports: [UserOtpService],
})
export class UserOtpModule {}
