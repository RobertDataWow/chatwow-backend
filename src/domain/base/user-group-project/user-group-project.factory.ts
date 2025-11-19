import { uuidV7 } from '@shared/common/common.crypto';
import { isDefined } from '@shared/common/common.validator';

import type { UserGroupProjectPlain } from './types/user-group-project.domain.type';
import { UserGroupProjectMapper } from './user-group-project.mapper';

export class UserGroupProjectFactory {
  static mock(data: Partial<UserGroupProjectPlain>) {
    return UserGroupProjectMapper.fromPlain({
      projectId: isDefined(data.projectId) ? data.projectId : uuidV7(),
      userGroupId: isDefined(data.userGroupId) ? data.userGroupId : uuidV7(),
    });
  }

  static mockBulk(amount: number, data: Partial<UserGroupProjectPlain>) {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
