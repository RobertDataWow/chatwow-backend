import * as React from 'react';
import { Html } from '@react-email/components';
import { User } from '@domain/base/user/user.domain';
import { PasswordResetToken } from '@domain/base/password-reset-token/password-reset-token.domain';
import { UserFactory } from '@domain/base/user/user.factory';
import { PasswordResetTokenFactory } from '@domain/base/password-reset-token/password-reset-token.factory';

type DefaultProps = {
  user: User;
  passwordResetToken: PasswordResetToken;
  plainToken: string
  frontendUrl: string;
};

export default function TemplateForgotPassword({ user, passwordResetToken, plainToken, frontendUrl }: DefaultProps) {
  user ??= UserFactory.mock({});
  passwordResetToken ??= PasswordResetTokenFactory.mock({});
  plainToken ??= 'mock-plain-token';
  frontendUrl ??= 'http://localhost:8001';

  return (
    <Html lang="en">
      <a href={`${frontendUrl}/th/reset-password?token=${plainToken}`}>Reset Password</a>
    </Html>
  );
}
