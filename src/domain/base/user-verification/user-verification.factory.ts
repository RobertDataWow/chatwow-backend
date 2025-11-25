import { generateVerificationCode, uuidV7 } from '@shared/common/common.crypto';
import { isDefined } from '@shared/common/common.validator';

import type { UserVerificationPlain } from './types/user-verification.domain.type';
import { UserVerificationMapper } from './user-verification.mapper';

export class UserVerificationFactory {
  static mock(data: Partial<UserVerificationPlain>) {
    return UserVerificationMapper.fromPlain({
      id: isDefined(data.id) ? data.id : generateVerificationCode(),
      createdAt: isDefined(data.createdAt) ? data.createdAt : new Date(),
      userId: isDefined(data.userId) ? data.userId : uuidV7(),
      expireAt: isDefined(data.expireAt)
        ? data.expireAt
        : new Date(Date.now() + 5 * 60 * 1000),
    });
  }

  static mockBulk(amount: number, data: Partial<UserVerificationPlain>) {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
