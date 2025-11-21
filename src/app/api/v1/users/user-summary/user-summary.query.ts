import { Inject } from '@nestjs/common';

import { READ_DB, ReadDB } from '@infra/db/db.common';

import { QueryInterface } from '@shared/common/common.type';

import { UserSummaryDto, UserSummaryResponse } from './user-summary.dto';

export class UserSummaryQuery implements QueryInterface {
  constructor(
    @Inject(READ_DB)
    private readDb: ReadDB,
  ) {}

  async exec(query: UserSummaryDto): Promise<UserSummaryResponse> {
    const data = await this.getRaw(query);

    return {
      success: true,
      key: '',
      data: {
        totalUsers: Number(data.totalUsers),
        activeUsers: data.activeUsers ? Number(data.activeUsers) : undefined,
        inactiveUsers: data.inactiveUsers
          ? Number(data.inactiveUsers)
          : undefined,
        pendingRegistrationUsers: data.pendingRegistrationUsers
          ? Number(data.pendingRegistrationUsers)
          : undefined,
        lineLinkedUsers: data.lineLinkedUsers
          ? Number(data.lineLinkedUsers)
          : undefined,
      },
    };
  }

  async getRaw(query: UserSummaryDto) {
    const data = await this.readDb
      .selectFrom('users')
      .select(({ fn }) => fn.count<string>('users.id').as('totalUsers'))
      .$if(query.includes.has('activeUsers'), (qb) =>
        qb.select(({ fn }) =>
          fn
            .count<string>('users.id')
            .filterWhere('users.user_status', '=', 'ACTIVE')
            .as('activeUsers'),
        ),
      )
      .$if(query.includes.has('inactiveUsers'), (qb) =>
        qb.select(({ fn }) =>
          fn
            .count<string>('users.id')
            .filterWhere('users.user_status', '=', 'INACTIVE')
            .as('inactiveUsers'),
        ),
      )
      .$if(query.includes.has('pendingRegistrationUsers'), (qb) =>
        qb.select(({ fn }) =>
          fn
            .count<string>('users.id')
            .filterWhere('users.user_status', '=', 'PENDING_REGISTRATION')
            .as('pendingRegistrationUsers'),
        ),
      )
      .$if(query.includes.has('lineLinkedUsers'), (qb) =>
        qb.select(({ fn }) =>
          fn
            .count<string>('users.id')
            .filterWhere('users.line_account_id', 'is not', null)
            .as('lineLinkedUsers'),
        ),
      )
      .executeTakeFirstOrThrow();

    return data;
  }
}
