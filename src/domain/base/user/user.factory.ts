import { hashString, uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { isDefined } from '@shared/common/common.validator';

import type { UserPlain } from './types/user.domain.type';
import { UserMapper } from './user.mapper';

export class UserFactory {
  static mock(data?: Partial<UserPlain>) {
    return UserMapper.fromPlain({
      id: isDefined(data?.id) ? data.id : uuidV7(),
      createdAt: isDefined(data?.createdAt)
        ? data.createdAt
        : myDayjs().toDate(),
      updatedAt: isDefined(data?.updatedAt)
        ? data.updatedAt
        : myDayjs().toDate(),
      email: isDefined(data?.email) ? data.email : 'test@example.com',
      password: isDefined(data?.password)
        ? hashString(data.password)
        : hashString('password'),
      lastSignedInAt: isDefined(data?.lastSignedInAt)
        ? data.lastSignedInAt
        : null,
      status: isDefined(data?.status) ? data.status : 'ACTIVE',
    });
  }

  static mockBulk(amount: number, data?: Partial<UserPlain>) {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
