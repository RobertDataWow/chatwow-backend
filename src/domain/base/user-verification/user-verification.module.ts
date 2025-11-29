import { Module } from '@nestjs/common';

import { UserVerificationService } from './user-verification.service';

@Module({
  providers: [UserVerificationService],
  exports: [UserVerificationService],
})
export class UserVerificationModule {}
