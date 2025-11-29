import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';

import type {
  UserManageProjectNewData,
  UserManageProjectPg,
  UserManageProjectPlain,
} from './user-manage-project.type';
import { UserManageProjectMapper } from './user-manage-project.mapper';

export class UserManageProject extends DomainEntity<UserManageProjectPg> {
  readonly createdAt: Date;
  readonly projectId: string;
  readonly userId: string;

  constructor(plain: UserManageProjectPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: UserManageProjectNewData) {
    return UserManageProjectMapper.fromPlain({
      createdAt: myDayjs().toDate(),
      projectId: data.projectId,
      userId: data.userId,
    });
  }

  static newBulk(data: UserManageProjectNewData[]) {
    return data.map((d) => UserManageProject.new(d));
  }
}
