import { Module } from '@nestjs/common';

import { UserVerificationRepo } from './user-verification.repo';
import { UserVerificationService } from './user-verification.service';

@Module({
  providers: [UserVerificationRepo, UserVerificationService],
  exports: [UserVerificationService],
})
export class UserVerificationModule {}
