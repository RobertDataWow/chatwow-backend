import { DomainEntity } from '@shared/common/common.domain';

import type {
  UserManageProjectNewData,
  UserManageProjectPg,
  UserManageProjectPlain,
  UserManageProjectUpdateData,
} from './types/user-manage-project.domain.type';

export class UserManageProject extends DomainEntity<UserManageProjectPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly projectId: string;
  readonly userId: string;

  constructor(plain: UserManageProjectPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: UserManageProjectNewData): UserManageProject {
    return new UserManageProject({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data,
    });
  }

  edit(data: UserManageProjectUpdateData) {
    Object.assign(this, data);
  }
}
