import { uuidV7 } from '@shared/common/common.crypto';
import { isDefined } from '@shared/common/common.validator';

import type { UserGroupUserPlain } from './types/user-group-user.domain.type';
import { UserGroupUserMapper } from './user-group-user.mapper';

export class UserGroupUserFactory {
  static mock(data: Partial<UserGroupUserPlain>) {
    return UserGroupUserMapper.fromPlain({
      userId: isDefined(data.userId) ? data.userId : uuidV7(),
      userGroupId: isDefined(data.userGroupId) ? data.userGroupId : uuidV7(),
    });
  }

  static mockBulk(amount: number, data: Partial<UserGroupUserPlain>) {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
