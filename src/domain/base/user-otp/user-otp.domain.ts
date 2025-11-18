import { generateOTP, uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import type {
  UserOtpNewData,
  UserOtpPg,
  UserOtpPlain,
  UserOtpUpdateData,
} from './types/user-otp.domain.type';

export class UserOtp extends DomainEntity<UserOtpPg> {
  readonly id: string;
  readonly otp: string;
  readonly createdAt: Date;
  readonly userId: string;
  readonly expireAt: Date;

  constructor(plain: UserOtpPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: UserOtpNewData) {
    const now = myDayjs();

    return {
      id: uuidV7(),
      otp: generateOTP(),
      createdAt: now.toDate(),
      userId: data.userId,
      expireAt: now.add(30, 'minutes').toDate(),
    } as UserOtpPlain;
  }

  static newBulk(data: UserOtpNewData[]) {
    return data.map((d) => {
      const plain: UserOtpPlain = UserOtp.new(d);
      return new UserOtp(plain);
    });
  }

  edit(data: UserOtpUpdateData) {
    const plain: UserOtpPlain = {
      id: this.id,
      otp: this.otp,
      createdAt: this.createdAt,
      userId: this.userId,

      // update
      expireAt: isDefined(data.expireAt) ? data.expireAt : this.expireAt,
    };

    Object.assign(this, plain);
  }
}
