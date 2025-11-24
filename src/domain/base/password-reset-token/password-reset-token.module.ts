import { Module } from '@nestjs/common';

import { PasswordResetTokenRepo } from './password-reset-token.repo';
import { PasswordResetTokenService } from './password-reset-token.service';

@Module({
  providers: [PasswordResetTokenService, PasswordResetTokenRepo],
  exports: [PasswordResetTokenService],
})
export class PasswordResetTokenModule {}
