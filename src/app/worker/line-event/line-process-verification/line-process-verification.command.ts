import { LineAccount } from '@domain/base/line-account/line-account.domain';
import { LineAccountService } from '@domain/base/line-account/line-account.service';
import { LineSession } from '@domain/base/line-session/line-session.domain';
import { LineSessionService } from '@domain/base/line-session/line-session.service';
import { usersVerificationsTableFilter } from '@domain/base/user-verification/user-verification.util';
import { User } from '@domain/base/user/user.domain';
import { UserMapper } from '@domain/base/user/user.mapper';
import { UserService } from '@domain/base/user/user.service';
import { usersTableFilter } from '@domain/base/user/user.util';
import { LineEventQueue } from '@domain/orchestration/queue/line-event/line-event.queue';
import { Inject, Injectable } from '@nestjs/common';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

import { READ_DB, ReadDB } from '@infra/db/db.common';
import { LineService } from '@infra/global/line/line.service';
import { TransactionService } from '@infra/global/transaction/transaction.service';

import myDayjs from '@shared/common/common.dayjs';

import {
  LINE_INVALID_VERIFICATION_REPLY,
  LINE_SUCCESS_VERIFICATION_REPLY,
} from '../line-event.constant';
import { LineProcessVerificationJobData } from './line-process-verification.type';

type Entity = {
  user: User;
  lineAccount: LineAccount;
  lineSession: LineSession;
};

@Injectable()
export class LineProcessVerificationCommand {
  constructor(
    @Inject(READ_DB)
    private readDb: ReadDB,

    private lineAccountService: LineAccountService,
    private lineSessionService: LineSessionService,
    private userService: UserService,

    private transactionService: TransactionService,
    private lineEventQueue: LineEventQueue,
  ) {}

  async exec({ lineBot, lineSession, data }: LineProcessVerificationJobData) {
    const lineService = new LineService(lineBot);

    const user = await this.findUserFromVerification(data.verificationCode);
    if (!user) {
      await lineService.reply(data.replyToken, LINE_INVALID_VERIFICATION_REPLY);
      return;
    }

    const lineAccount = LineAccount.new({
      id: lineSession.lineAccountId,
    });
    user.edit({
      data: {
        lineAccountId: lineAccount.id,
      },
    });

    await this.save({
      lineAccount,
      lineSession,
      user,
    });

    await lineService.reply(data.replyToken, LINE_SUCCESS_VERIFICATION_REPLY);
    this.lineEventQueue.jobShowSelectionMenu({
      lineBot,
      lineSession,
      data: {
        replyToken: data.replyToken,
        lineAccountId: lineSession.lineAccountId,
      },
    });
  }

  async save(entity: Entity) {
    await this.transactionService.transaction(async () => {
      await this.lineAccountService.save(entity.lineAccount);
      await this.lineSessionService.save(entity.lineSession);
      await this.userService.save(entity.user);
    });
  }

  async findUserFromVerification(verificationCode: string) {
    const res = await this.readDb
      .selectFrom('user_verifications')
      .where(usersVerificationsTableFilter)
      .where('user_verifications.id', '=', verificationCode)
      .where('user_verifications.expire_at', '>', myDayjs().toISOString())
      .selectAll('user_verifications')
      .select((eb) =>
        jsonObjectFrom(
          eb
            .selectFrom('users')
            .selectAll()
            .where(usersTableFilter)
            .whereRef('users.id', '=', 'user_verifications.user_id'),
        ).as('user'),
      )
      .executeTakeFirst();

    if (!res || !res.user) {
      return null;
    }

    return UserMapper.fromPgWithState(res.user);
  }
}
