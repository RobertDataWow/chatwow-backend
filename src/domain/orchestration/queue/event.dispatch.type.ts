import type { PasswordResetToken } from '@domain/base/password-reset-token/password-reset-token.domain';
import type { User } from '@domain/base/user/user.domain';

export type ForgotPasswordDispatchEvent = {
  user: User;
  passwordResetToken: PasswordResetToken;
  plainToken: string;
};
