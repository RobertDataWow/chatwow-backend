import { isDefined } from '@shared/common/common.validator';

import { PasswordResetToken } from './password-reset-token.domain';
import { PasswordResetTokenMapper } from './password-reset-token.mapper';
import type { PasswordResetTokenPlain } from './password-reset-token.type';

export class PasswordResetTokenFactory {
  static mock(data: Partial<PasswordResetTokenPlain>): PasswordResetToken {
    return PasswordResetTokenMapper.fromPlain({
      id: isDefined(data.id) ? data.id : 'mock-token-id',
      createdAt: isDefined(data.createdAt) ? data.createdAt : new Date(),
      userId: isDefined(data.userId) ? data.userId : 'mock-user-id',
      tokenHash: isDefined(data.tokenHash) ? data.tokenHash : 'mock-token',
      expireAt: isDefined(data.expireAt)
        ? data.expireAt
        : new Date(Date.now() + 3600 * 1000),
      revokeAt: isDefined(data.revokeAt) ? data.revokeAt : null,
    });
  }

  static mockBulk(
    amount: number,
    data: Partial<PasswordResetTokenPlain>,
  ): PasswordResetToken[] {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
