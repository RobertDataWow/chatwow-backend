import type {
  PasswordResetTokenJson,
  PasswordResetTokenPg,
} from '@domain/base/password-reset-token/types/password-reset-token.domain.type';
import type {
  UserJson,
  UserPg,
} from '@domain/base/user/types/user.domain.type';

import type { WithPgState } from '@shared/common/common.type';

export type SendVerificationJobData = WithPgState<UserJson, UserPg>;
export type SendForgotPasswordJobData = {
  user: WithPgState<UserJson, UserPg>;
  passwordResetToken: WithPgState<PasswordResetTokenJson, PasswordResetTokenPg>;
  plainToken: string;
};
