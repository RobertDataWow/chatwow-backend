import { UserOtp } from '@domain/base/user-otp/user-otp.domain';
import { UserOtpService } from '@domain/base/user-otp/user-otp.service';
import type { User } from '@domain/base/user/user.domain';
import { UserService } from '@domain/base/user/user.service';
import { Injectable } from '@nestjs/common';

import { TransactionService } from '@infra/global/transaction/transaction.service';

import type { CommandInterface } from '@shared/common/common.type';

@Injectable()
export class SendOtpCommand implements CommandInterface {
  constructor(
    private userOtpService: UserOtpService,
    private userService: UserService,
    private transactionService: TransactionService,
  ) {}

  async exec(user: User) {
    const userOtp = UserOtp.new({
      userId: user.id,
    });

    await this.userOtpService.sendOtpMail(user, userOtp);
    await this.save(user, userOtp);

    return;
  }

  async save(user: User, otp: UserOtp): Promise<void> {
    await this.transactionService.transaction(async () => {
      await this.userService.save(user);
      await this.userOtpService.save(otp);
    });

    return;
  }
}
