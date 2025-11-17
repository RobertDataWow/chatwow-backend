import type { UsersStatus } from '@infra/db/db';

import { hashString, uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import type {
  UserNewData,
  UserPg,
  UserPlain,
  UserUpdateData,
} from './types/user.domain.type';
import { UserMapper } from './user.mapper';

export class User extends DomainEntity<UserPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly email: string;
  readonly password: string;
  readonly lastSignedInAt: Date | null;
  readonly status: UsersStatus;

  constructor(plain: UserPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: UserNewData): User {
    return UserMapper.fromPlain({
      id: uuidV7(),
      createdAt: myDayjs().toDate(),
      updatedAt: myDayjs().toDate(),
      email: data.email,
      password: hashString(data.password),
      lastSignedInAt: null,
      status: data.status,
    });
  }
  static newBulk(data: UserNewData[]) {
    return data.map((d) => User.new(d));
  }

  edit(data: UserUpdateData) {
    const plain: UserPlain = {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: myDayjs().toDate(),

      // update able
      email: isDefined(data.email) ? data.email : this.email,
      password: isDefined(data.password)
        ? hashString(data.password)
        : this.password,
      lastSignedInAt: isDefined(data.lastSignedInAt)
        ? data.lastSignedInAt
        : this.lastSignedInAt,
      status: isDefined(data.status) ? data.status : this.status,
    };

    Object.assign(this, plain);
  }
}
