import { UserGroupUserService } from '@domain/base/user-group-user/user-group-user.service';
import { UserGroup } from '@domain/base/user-group/user-group.domain';
import { UserGroupMapper } from '@domain/base/user-group/user-group.mapper';
import { userGroupsTableFilter } from '@domain/base/user-group/user-group.utils';
import { User } from '@domain/base/user/user.domain';
import { UserMapper } from '@domain/base/user/user.mapper';
import { UserService } from '@domain/base/user/user.service';
import { usersTableFilter } from '@domain/base/user/user.util';
import { Inject, Injectable } from '@nestjs/common';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

import { READ_DB, ReadDB } from '@infra/db/db.common';
import { TransactionService } from '@infra/global/transaction/transaction.service';

import { CommandInterface } from '@shared/common/common.type';
import { ApiException } from '@shared/http/http.exception';
import { HttpResponseMapper } from '@shared/http/http.mapper';

import { EditUserDto, EditUserResponse } from './edit-user.dto';

type Entity = {
  user: User;
  userGroups: UserGroup[];
};

@Injectable()
export class EditUserCommand implements CommandInterface {
  constructor(
    @Inject(READ_DB)
    private readDb: ReadDB,
    private transactionService: TransactionService,
    private userService: UserService,
    private userGroupUserService: UserGroupUserService,
  ) {}

  async exec(id: string, body: EditUserDto): Promise<EditUserResponse> {
    const entity = await this.find(id);

    if (body.user) {
      entity.user.edit(body.user);
    }

    if (body.userGroupIds) {
      const userGroupSet = new Set(body.userGroupIds);
      entity.userGroups.filter((ug) => userGroupSet.has(ug.id));
    }

    await this.save(entity);

    return HttpResponseMapper.toSuccess({
      data: {
        user: {
          attributes: UserMapper.toResponse(entity.user),
          relations: {
            userGroups: entity.userGroups.map((g) => ({
              attributes: UserGroupMapper.toResponse(g),
            })),
          },
        },
      },
    });
  }

  async save(entity: Entity): Promise<void> {
    const user = entity.user;
    const userGroups = entity.userGroups;

    await this.transactionService.transaction(async () => {
      await this.userService.save(user);
      await this.userGroupUserService.saveUserRelations(
        user.id,
        userGroups.map((g) => g.id),
      );
    });
  }

  async find(id: string): Promise<Entity> {
    const user = await this.readDb
      .selectFrom('users')
      .selectAll()
      .select((q) => [
        jsonArrayFrom(
          q
            .selectFrom('user_group_users')
            .innerJoin(
              'user_groups',
              'user_groups.id',
              'user_group_users.user_group_id',
            )
            .selectAll('user_groups')
            .where(userGroupsTableFilter)
            .whereRef('user_group_users.user_id', '=', 'users.id'),
        ).as('userGroups'),
      ])
      .where('id', '=', id)
      .where(usersTableFilter)
      .executeTakeFirst();

    if (!user) {
      throw new ApiException(404, 'userNotFound');
    }

    return {
      user: UserMapper.fromPgWithState(user),
      userGroups: user.userGroups.map((ug) => UserGroupMapper.fromPg(ug)),
    };
  }
}
