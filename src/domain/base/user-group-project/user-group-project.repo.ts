import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { UserGroupProject } from './user-group-project.domain';
import { UserGroupProjectMapper } from './user-group-project.mapper';

@Injectable()
export class UserGroupProjectRepo extends BaseRepo {
  async create(userGroupProject: UserGroupProject): Promise<void> {
    await this.db
      //
      .insertInto('user_group_projects')
      .values(UserGroupProjectMapper.toPg(userGroupProject))
      .execute();
  }

  async update(id: string, userGroupProject: UserGroupProject): Promise<void> {
    const data = diff(
      userGroupProject.pgState,
      UserGroupProjectMapper.toPg(userGroupProject),
    );
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('user_group_projects')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<UserGroupProject | null> {
    const userGroupProjectPg = await this.readDb
      .selectFrom('user_group_projects')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!userGroupProjectPg) {
      return null;
    }

    const userGroupProject =
      UserGroupProjectMapper.fromPgWithState(userGroupProjectPg);
    return userGroupProject;
  }

  async delete(id: string): Promise<void> {
    await this.db
      //
      .deleteFrom('user_group_projects')
      .where('id', '=', id)
      .execute();
  }
}
