import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { UserGroup } from './user-group.domain';
import { UserGroupMapper } from './user-group.mapper';

@Injectable()
export class UserGroupRepo extends BaseRepo {
  async create(userGroup: UserGroup): Promise<void> {
    await this.db
      //
      .insertInto('user_groups')
      .values(UserGroupMapper.toPg(userGroup))
      .execute();
  }

  async update(id: string, userGroup: UserGroup): Promise<void> {
    const data = diff(userGroup.pgState, UserGroupMapper.toPg(userGroup));
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('user_groups')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<UserGroup | null> {
    const userGroupPg = await this.readDb
      .selectFrom('user_groups')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!userGroupPg) {
      return null;
    }

    const userGroup = UserGroupMapper.fromPgWithState(userGroupPg);
    return userGroup;
  }

  async delete(id: string): Promise<void> {
    await this.db
      //
      .deleteFrom('user_groups')
      .where('id', '=', id)
      .execute();
  }
}
