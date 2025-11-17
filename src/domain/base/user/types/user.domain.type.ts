import type { OverrideProperties } from 'type-fest';

import type { Users, UsersStatus } from '@infra/db/db';
import type { DBModel } from '@infra/db/db.common';

import type { Plain } from '@shared/common/common.type';

import type { User } from '../user.domain';

export type UserPg = DBModel<Users>;
export type UserPlain = Plain<User>;

export type UserJson = OverrideProperties<
  UserPlain,
  {
    createdAt: string;
    updatedAt: string;
    lastSignedInAt: string | null;
  }
>;

export type UserNewData = {
  email: string;
  password: string;
  status: UsersStatus;
};
export type UserUpdateData = {
  email?: string;
  password?: string;
  status?: UsersStatus;
  lastSignedInAt?: Date | null;
};
