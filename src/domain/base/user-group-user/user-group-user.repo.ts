import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { UserGroupUser } from './user-group-user.domain';
import { UserGroupUserMapper } from './user-group-user.mapper';

@Injectable()
export class UserGroupUserRepo extends BaseRepo {
  async create(userGroupUser: UserGroupUser): Promise<void> {
    await this.db
      //
      .insertInto('user_group_users')
      .values(UserGroupUserMapper.toPg(userGroupUser))
      .execute();
  }

  async update(id: string, userGroupUser: UserGroupUser): Promise<void> {
    const data = diff(
      userGroupUser.pgState,
      UserGroupUserMapper.toPg(userGroupUser),
    );
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('user_group_users')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<UserGroupUser | null> {
    const userGroupUserPg = await this.readDb
      .selectFrom('user_group_users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!userGroupUserPg) {
      return null;
    }

    const userGroupUser = UserGroupUserMapper.fromPgWithState(userGroupUserPg);
    return userGroupUser;
  }

  async delete(id: string): Promise<void> {
    await this.db
      //
      .deleteFrom('user_group_users')
      .where('id', '=', id)
      .execute();
  }
}
