import type {
  UserGroupUserJson,
  UserGroupUserPg,
  UserGroupUserPlain,
} from './types/user-group-user.domain.type';
import { UserGroupUser } from './user-group-user.domain';
import type { UserGroupUserResponse } from './user-group-user.response';

export class UserGroupUserMapper {
  static fromPg(pg: UserGroupUserPg): UserGroupUser {
    const plain: UserGroupUserPlain = {
      userId: pg.user_id,
      userGroupId: pg.user_group_id,
    };

    return new UserGroupUser(plain);
  }

  static fromPgWithState(pg: UserGroupUserPg): UserGroupUser {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: UserGroupUserPlain): UserGroupUser {
    const plain: UserGroupUserPlain = {
      userId: plainData.userId,
      userGroupId: plainData.userGroupId,
    };

    return new UserGroupUser(plain);
  }

  static fromJson(json: UserGroupUserJson): UserGroupUser {
    const plain: UserGroupUserPlain = {
      userId: json.userId,
      userGroupId: json.userGroupId,
    };

    return new UserGroupUser(plain);
  }

  static toPg(userGroupUser: UserGroupUserPlain): UserGroupUserPg {
    return {
      user_id: userGroupUser.userId,
      user_group_id: userGroupUser.userGroupId,
    };
  }

  static toPlain(userGroupUser: UserGroupUser): UserGroupUserPlain {
    return {
      userId: userGroupUser.userId,
      userGroupId: userGroupUser.userGroupId,
    };
  }

  static toJson(userGroupUser: UserGroupUser): UserGroupUserJson {
    return {
      userId: userGroupUser.userId,
      userGroupId: userGroupUser.userGroupId,
    };
  }

  static toResponse(userGroupUser: UserGroupUser): UserGroupUserResponse {
    return {
      userId: userGroupUser.userId,
      userGroupId: userGroupUser.userGroupId,
    };
  }
}
