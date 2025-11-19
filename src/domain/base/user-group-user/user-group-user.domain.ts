import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import type {
  UserGroupUserNewData,
  UserGroupUserPg,
  UserGroupUserPlain,
  UserGroupUserUpdateData,
} from './types/user-group-user.domain.type';

export class UserGroupUser extends DomainEntity<UserGroupUserPg> {
  readonly userId: string;
  readonly userGroupId: string;

  constructor(plain: UserGroupUserPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: UserGroupUserNewData) {
    return {
      userId: data.userId || null,
      userGroupId: data.userGroupId || null,
    } as UserGroupUserPlain;
  }

  static newBulk(data: UserGroupUserNewData[]) {
    return data.map((d) => UserGroupUser.new(d));
  }

  edit(data: UserGroupUserUpdateData) {
    const plain: UserGroupUserPlain = {
      userId: isDefined(data.userId) ? data.userId : this.userId,
      userGroupId: isDefined(data.userGroupId)
        ? data.userGroupId
        : this.userGroupId,
    };

    Object.assign(this, plain);
  }
}
