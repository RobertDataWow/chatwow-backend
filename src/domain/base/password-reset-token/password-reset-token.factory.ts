import { PasswordResetToken } from './password-reset-token.domain';
import type { PasswordResetTokenNewData } from './types/password-reset-token.domain.type';

export class PasswordResetTokenFactory {
  static create(data: PasswordResetTokenNewData): PasswordResetToken {
    return PasswordResetToken.new(data);
  }
}
