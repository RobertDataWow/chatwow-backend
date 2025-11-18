import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';

import type {
  UserManageProjectNewData,
  UserManageProjectPg,
  UserManageProjectPlain,
} from './types/user-manage-project.domain.type';
import { UserManageProjectMapper } from './user-manage-project.mapper';

export class UserManageProject extends DomainEntity<UserManageProjectPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly projectId: string;
  readonly userId: string;

  constructor(plain: UserManageProjectPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: UserManageProjectNewData) {
    return UserManageProjectMapper.fromPlain({
      id: uuidV7(),
      createdAt: myDayjs().toDate(),
      projectId: data.projectId,
      userId: data.userId,
    });
  }

  static newBulk(data: UserManageProjectNewData[]) {
    return data.map((d) => UserManageProject.new(d));
  }
}
