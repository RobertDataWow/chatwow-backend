import type { DBModel } from '@infra/db/db.common';
import type { UserOtps } from '@infra/db/db.d';

import type { Plain } from '@shared/common/common.type';

import type { UserOtp } from '../user-otp.domain';

export type UserOtpPg = DBModel<UserOtps>;
export type UserOtpPlain = Plain<UserOtp>;

export type UserOtpJson = UserOtpPlain;

export type UserOtpNewData = {
  userId: string;
};

export type UserOtpUpdateData = {
  expireAt?: Date;
};
