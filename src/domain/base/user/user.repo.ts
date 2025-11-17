import { Injectable } from '@nestjs/common';

import { WhereBuilder } from '@infra/db/db.common';
import { sortQb } from '@infra/db/db.util';

import { diff, getUniqueIds } from '@shared/common/common.func';
import { getQueryPagination } from '@shared/common/common.pagintaion';
import { BaseRepo } from '@shared/common/common.repo';

import { UserQueryOptions } from './types/user.common.type';
import { User } from './user.domain';
import { UserMapper } from './user.mapper';

@Injectable()
export class UserRepo extends BaseRepo {
  async create(user: User): Promise<void> {
    await this.db
      //
      .insertInto('users')
      .values(UserMapper.toPg(user))
      .execute();
  }

  async update(id: string, user: User): Promise<void> {
    const data = diff(user.pgState, UserMapper.toPg(user));
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('users')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<User | null> {
    const userPg = await this.readDb
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!userPg) {
      return null;
    }

    const user = UserMapper.fromPgWithState(userPg);

    return user;
  }

  async findOneByEmail(email: string): Promise<User | null> {
    const userPg = await this.readDb
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (!userPg) {
      return null;
    }

    const user = UserMapper.fromPgWithState(userPg);

    return user;
  }

  async findIds(opts?: UserQueryOptions) {
    opts ??= {};

    const { filter, sort, pagination } = opts;
    const { limit, offset } = getQueryPagination(pagination);

    const res = await this.readDb
      .selectFrom('users')
      .select('users.id')
      .$if(!!limit, (q) => q.limit(limit!))
      .$if(!!offset, (q) => q.offset(offset!))
      .$if(!!sort?.length, (q) =>
        sortQb(q, sort, { id: 'users.id', createdAt: 'users.created_at' }),
      )
      .where((eb) => {
        const builder: WhereBuilder = [];

        if (filter?.email) {
          builder.push(eb('email', '=', filter.email!));
        }

        if (filter?.status) {
          builder.push(eb('status', '=', filter.status));
        }

        return eb.and(builder);
      })
      .execute();

    return getUniqueIds(res);
  }
}
