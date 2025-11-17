import { toDate, toResponseDate } from '@shared/common/common.transformer';

import type { UserJson, UserPg, UserPlain } from './types/user.domain.type';
import { User } from './user.domain';
import type { UserResponse } from './user.response';

export class UserMapper {
  static fromPg(pg: UserPg): User {
    const plain: UserPlain = {
      id: pg.id,
      createdAt: toDate(pg.created_at),
      updatedAt: toDate(pg.updated_at),
      email: pg.email,
      password: pg.password || null,
      role: pg.role,
      userStatus: pg.user_status,
      lineUid: pg.line_uid || null,
    };

    return new User(plain);
  }

  static fromPgWithState(pg: UserPg): User {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: UserPlain): User {
    const plain: UserPlain = {
      id: plainData.id,
      createdAt: plainData.createdAt,
      updatedAt: plainData.updatedAt,
      email: plainData.email,
      password: plainData.password,
      role: plainData.role,
      userStatus: plainData.userStatus,
      lineUid: plainData.lineUid,
    };

    return new User(plain);
  }

  static fromJson(json: UserJson): User {
    const plain: UserPlain = {
      id: json.id,
      createdAt: toDate(json.createdAt),
      updatedAt: toDate(json.updatedAt),
      email: json.email,
      password: json.password,
      role: json.role,
      userStatus: json.userStatus,
      lineUid: json.lineUid,
    };

    return new User(plain);
  }

  static toPg(user: User): UserPg {
    return {
      id: user.id,
      created_at: user.createdAt.toISOString(),
      updated_at: user.updatedAt.toISOString(),
      email: user.email,
      password: user.password,
      role: user.role,
      user_status: user.userStatus,
      line_uid: user.lineUid,
    };
  }

  static toPlain(user: User): UserPlain {
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      email: user.email,
      password: user.password,
      role: user.role,
      userStatus: user.userStatus,
      lineUid: user.lineUid,
    };
  }

  static toJson(user: User): UserJson {
    return {
      id: user.id,
      createdAt: toResponseDate(user.createdAt),
      updatedAt: toResponseDate(user.updatedAt),
      email: user.email,
      password: user.password,
      role: user.role,
      userStatus: user.userStatus,
      lineUid: user.lineUid,
    };
  }

  static toResponse(user: User): UserResponse {
    return {
      id: user.id,
      createdAt: toResponseDate(user.createdAt),
      updatedAt: toResponseDate(user.updatedAt),
      email: user.email,
      role: user.role,
      userStatus: user.userStatus,
      lineUid: user.lineUid,
    };
  }
}
