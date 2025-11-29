import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import type {
  UserGroupProjectNewData,
  UserGroupProjectPg,
  UserGroupProjectPlain,
  UserGroupProjectUpdateData,
} from './user-group-project.type';
import { UserGroupProjectMapper } from './user-group-project.mapper';

export class UserGroupProject extends DomainEntity<UserGroupProjectPg> {
  readonly projectId: string;
  readonly userGroupId: string;

  constructor(plain: UserGroupProjectPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: UserGroupProjectNewData) {
    return UserGroupProjectMapper.fromPlain({
      projectId: data.projectId,
      userGroupId: data.userGroupId,
    });
  }

  static newBulk(data: UserGroupProjectNewData[]) {
    return data.map((d) => UserGroupProject.new(d));
  }

  edit(data: UserGroupProjectUpdateData) {
    const plain: UserGroupProjectPlain = {
      projectId: isDefined(data.projectId) ? data.projectId : this.projectId,
      userGroupId: isDefined(data.userGroupId)
        ? data.userGroupId
        : this.userGroupId,
    };

    Object.assign(this, plain);
  }
}
