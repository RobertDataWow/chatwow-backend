import { PasswordResetTokens } from '@infra/db/db';
import type { DBModel } from '@infra/db/db.common';

import type { Plain, Serialized } from '@shared/common/common.type';

import type { PasswordResetToken } from '../password-reset-token.domain';

export type PasswordResetTokenPg = DBModel<PasswordResetTokens>;
export type PasswordResetTokenPlain = Plain<PasswordResetToken>;
export type PasswordResetTokenJson = Serialized<PasswordResetTokenPlain>;

export type PasswordResetTokenNewData = {
  userId: string;
  token: string;
  expireAt?: Date;
};

export type PasswordResetTokenUpdateData = {
  revokeAt?: Date | null;
};
