import type { PasswordResetToken } from '@domain/base/password-reset-token/password-reset-token.domain';
import type {
  PasswordResetTokenJson,
  PasswordResetTokenPg,
} from '@domain/base/password-reset-token/types/password-reset-token.domain.type';
import type { User } from '@domain/base/user/user.domain';
import type { UserJson, UserPg } from '@domain/base/user/user.type';

import type { WithPgState } from '@shared/common/common.type';

type Action = 'newUser' | 'resetPassword';
export type ForgotPasswordJobData = {
  user: User;
  passwordResetToken: PasswordResetToken;
  plainToken: string;
  action: Action;
};

export type ForgotPasswordJobInput = {
  user: WithPgState<UserJson, UserPg>;
  passwordResetToken: WithPgState<PasswordResetTokenJson, PasswordResetTokenPg>;
  plainToken: string;
  action: Action;
};
