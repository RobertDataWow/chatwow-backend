import type { DBModel } from '@infra/db/db.common';
import type { UserGroups } from '@infra/db/db.d';

import type { Plain } from '@shared/common/common.type';

import type { UserGroup } from '../user-group.domain';

export type UserGroupPg = DBModel<UserGroups>;
export type UserGroupPlain = Plain<UserGroup>;

export type UserGroupJson = UserGroupPlain;

export type UserGroupNewData = {
  groupName: string;
  description?: string;
};

export type UserGroupUpdateData = {
  groupName?: string;
  description?: string;
};
