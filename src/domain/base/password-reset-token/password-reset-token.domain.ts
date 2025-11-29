import { shaHashstring, uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import { PASSWORD_RESET_DEFAULT_EXPIRY_SECONDS } from './password-reset-token.constant';
import { PasswordResetTokenMapper } from './password-reset-token.mapper';
import type {
  PasswordResetTokenNewData,
  PasswordResetTokenPg,
  PasswordResetTokenPlain,
  PasswordResetTokenUpdateData,
} from './password-reset-token.type';

export class PasswordResetToken extends DomainEntity<PasswordResetTokenPg> {
  readonly id: string;
  readonly userId: string;
  readonly tokenHash: string;
  readonly createdAt: Date;
  readonly expireAt: Date;
  readonly revokeAt: Date | null;

  constructor(plain: PasswordResetTokenPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: PasswordResetTokenNewData) {
    return PasswordResetTokenMapper.fromPlain({
      id: uuidV7(),
      userId: data.userId,
      tokenHash: shaHashstring(data.token),
      createdAt: myDayjs().toDate(),
      expireAt: isDefined(data.expireAt)
        ? data.expireAt
        : myDayjs()
            .add(PASSWORD_RESET_DEFAULT_EXPIRY_SECONDS, 'seconds')
            .toDate(),
      revokeAt: null,
    });
  }

  static newBulk(data: PasswordResetTokenNewData[]) {
    return data.map((d) => PasswordResetToken.new(d));
  }

  edit(data: PasswordResetTokenUpdateData) {
    const plain: PasswordResetTokenPlain = {
      id: this.id,
      userId: this.userId,
      tokenHash: this.tokenHash,
      createdAt: this.createdAt,
      expireAt: this.expireAt,
      revokeAt: isDefined(data.revokeAt) ? data.revokeAt : this.revokeAt,
    };

    Object.assign(this, plain);
  }
}
