import { PasswordResetToken } from '@domain/base/password-reset-token/password-reset-token.domain';
import { PasswordResetTokenService } from '@domain/base/password-reset-token/password-reset-token.service';
import { Project } from '@domain/base/project/project.domain';
import { ProjectMapper } from '@domain/base/project/project.mapper';
import { projectsTableFilter } from '@domain/base/project/project.util';
import { UserGroupUserService } from '@domain/base/user-group-user/user-group-user.service';
import { UserGroup } from '@domain/base/user-group/user-group.domain';
import { UserGroupMapper } from '@domain/base/user-group/user-group.mapper';
import { userGroupsTableFilter } from '@domain/base/user-group/user-group.utils';
import { UserManageProjectService } from '@domain/base/user-manage-project/user-manage-project.service';
import { User } from '@domain/base/user/user.domain';
import { UserMapper } from '@domain/base/user/user.mapper';
import { UserService } from '@domain/base/user/user.service';
import { DomainEventQueue } from '@domain/orchestration/queue/domain-event/domain-event.queue';
import { Inject, Injectable } from '@nestjs/common';

import { READ_DB, ReadDB } from '@infra/db/db.common';
import { TransactionService } from '@infra/db/transaction/transaction.service';
import { UserClaims } from '@infra/middleware/jwt/jwt.common';

import { shaHashstring } from '@shared/common/common.crypto';
import { CommandInterface } from '@shared/common/common.type';
import { ApiException } from '@shared/http/http.exception';
import { HttpResponseMapper } from '@shared/http/http.mapper';

import { AddUserDto, AddUserResponse } from './add-user.dto';

type Entity = {
  user: User;
  userGroups: UserGroup[];
  manageProjects: Project[];
  passwordResetToken?: PasswordResetToken;
};

@Injectable()
export class AddUserCommand implements CommandInterface {
  constructor(
    @Inject(READ_DB)
    private readDb: ReadDB,
    private transactionService: TransactionService,
    private userService: UserService,
    private userGroupUserService: UserGroupUserService,
    private passwordResetTokenService: PasswordResetTokenService,
    private userManageProjectService: UserManageProjectService,
    private domainEventQueue: DomainEventQueue,
  ) {}

  async exec(claims: UserClaims, body: AddUserDto): Promise<AddUserResponse> {
    const user = User.new({
      actorId: claims.userId,
      data: body.user,
    });
    user.edit({
      actorId: claims.userId,
      data: {
        userStatus: 'PENDING_REGISTRATION',
      },
    });

    const userGroups = await this.getUserGroups(body.userGroupIds);
    const manageProjects = await this.getProjects(body.manageProjectIds);
    const entity: Entity = {
      user,
      userGroups,
      manageProjects,
    };

    const token = shaHashstring();
    if (user.role !== 'USER') {
      entity.passwordResetToken = PasswordResetToken.new({
        userId: user.id,
        token,
      });
    }

    await this.save(entity);

    this.domainEventQueue.jobSendVerification(user);

    if (user.role !== 'USER') {
      if (!entity.passwordResetToken) {
        // shouldn't happen
        throw new ApiException(500, 'internal');
      }

      // send reset email
      this.domainEventQueue.jobResetPassword({
        user: entity.user,
        plainToken: token,
        passwordResetToken: entity.passwordResetToken,
        action: 'newUser',
      });
    }

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

  async save({
    user,
    userGroups,
    passwordResetToken,
    manageProjects,
  }: Entity): Promise<void> {
    await this.transactionService.transaction(async () => {
      await this.userService.save(user);

      if (userGroups.length) {
        await this.userGroupUserService.saveUserRelations(
          user.id,
          userGroups.map((g) => g.id),
        );
      }

      if (manageProjects.length) {
        await this.userManageProjectService.saveUserRelations(
          user.id,
          manageProjects.map((p) => p.id),
        );
      }

      if (passwordResetToken) {
        await this.passwordResetTokenService.save(passwordResetToken);
      }
    });
  }

  async getUserGroups(ids?: string[]): Promise<UserGroup[]> {
    if (!ids?.length) {
      return [];
    }

    const rawGroups = await this.readDb
      .selectFrom('user_groups')
      .selectAll()
      .where('id', 'in', ids)
      .where(userGroupsTableFilter)
      .execute();

    if (rawGroups.length !== ids.length) {
      throw new ApiException(400, 'invalidGroupId');
    }

    return rawGroups.map((g) => UserGroupMapper.fromPgWithState(g));
  }

  async getProjects(ids?: string[]) {
    if (!ids?.length) {
      return [];
    }

    const rawProjects = await this.readDb
      .selectFrom('projects')
      .selectAll()
      .where('id', 'in', ids)
      .where(projectsTableFilter)
      .execute();

    if (rawProjects.length !== ids.length) {
      throw new ApiException(400, 'invalidProjectId');
    }

    return rawProjects.map((p) => ProjectMapper.fromPgWithState(p));
  }
}
