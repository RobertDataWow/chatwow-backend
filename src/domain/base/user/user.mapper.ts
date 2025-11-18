import {
  toDate,
  toISO,
  toResponseDate,
} from '@shared/common/common.transformer';

import type { UserJson, UserPg, UserPlain } from './types/user.domain.type';
import { User } from './user.domain';
import type { UserResponse } from './user.response';

export class UserMapper {
  static fromPg(pg: UserPg): User {
    const plain: UserPlain = {
      id: pg.id,
      lastSignedInAt: toDate(pg.last_signed_in_at),
      createdAt: toDate(pg.created_at),
      updatedAt: toDate(pg.updated_at),
      email: pg.email,
      password: pg.password || null,
      role: pg.role,
      lineAccountId: pg.line_account_id,
      userStatus: pg.user_status,
    };

    return new User(plain);
  }

  static fromPgWithState(pg: UserPg): User {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: UserPlain): User {
    const plain: UserPlain = {
      id: plainData.id,
      lastSignedInAt: plainData.lastSignedInAt,
      createdAt: plainData.createdAt,
      updatedAt: plainData.updatedAt,
      email: plainData.email,
      password: plainData.password,
      role: plainData.role,
      userStatus: plainData.userStatus,
      lineAccountId: plainData.lineAccountId,
    };

    return new User(plain);
  }

  static fromJson(json: UserJson): User {
    const plain: UserPlain = {
      id: json.id,
      createdAt: toDate(json.createdAt),
      updatedAt: toDate(json.updatedAt),
      lastSignedInAt: toDate(json.lastSignedInAt),
      email: json.email,
      password: json.password,
      role: json.role,
      userStatus: json.userStatus,
      lineAccountId: json.lineAccountId,
    };

    return new User(plain);
  }

  static toPg(user: User): UserPg {
    return {
      id: user.id,
      last_signed_in_at: toISO(user.lastSignedInAt),
      created_at: toISO(user.createdAt),
      updated_at: toISO(user.updatedAt),
      email: user.email,
      password: user.password,
      role: user.role,
      user_status: user.userStatus,
      line_account_id: user.lineAccountId,
    };
  }

  static toPlain(user: User): UserPlain {
    return {
      id: user.id,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      lastSignedInAt: user.lastSignedInAt,
      email: user.email,
      password: user.password,
      role: user.role,
      userStatus: user.userStatus,
      lineAccountId: user.lineAccountId,
    };
  }

  static toJson(user: User): UserJson {
    return {
      id: user.id,
      createdAt: toISO(user.createdAt),
      updatedAt: toISO(user.updatedAt),
      lastSignedInAt: toISO(user.updatedAt),
      email: user.email,
      password: user.password,
      role: user.role,
      userStatus: user.userStatus,
      lineAccountId: user.lineAccountId,
    };
  }

  static toResponse(user: User): UserResponse {
    return {
      id: user.id,
      createdAt: toResponseDate(user.createdAt),
      updatedAt: toResponseDate(user.updatedAt),
      lastSignedInAt: toResponseDate(user.lastSignedInAt),
      email: user.email,
      role: user.role,
      userStatus: user.userStatus,
      lineAccountId: user.lineAccountId,
    };
  }
}
