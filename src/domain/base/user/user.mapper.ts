import { toDate, toResponseDate } from '@shared/common/common.transformer';
import type { WithPgState } from '@shared/common/common.type';

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
      password: pg.password,
      lastSignedInAt: pg.last_signed_in_at
        ? new Date(pg.last_signed_in_at)
        : null,
      status: pg.status,
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
      lastSignedInAt: plainData.lastSignedInAt,
      status: plainData.status,
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
      lastSignedInAt: json.lastSignedInAt ? toDate(json.lastSignedInAt) : null,
      status: json.status,
    };

    return new User(plain);
  }

  static toPg(user: User): UserPg {
    return {
      id: user.id,
      created_at: user.createdAt.toISOString(),
      email: user.email,
      last_signed_in_at: user.lastSignedInAt?.toISOString() || null,
      password: user.password,
      status: user.status,
      updated_at: user.updatedAt.toISOString(),
    };
  }

  static toPlain(user: User): UserPlain {
    return {
      id: user.id,
      createdAt: user.createdAt,
      email: user.email,
      lastSignedInAt: user.lastSignedInAt,
      password: user.password,
      status: user.status,
      updatedAt: user.updatedAt,
    };
  }

  static toResponse(user: User): UserResponse {
    return {
      id: user.id,
      createdAt: toResponseDate(user.createdAt),
      email: user.email,
      lastSignedInAt: user.lastSignedInAt
        ? toResponseDate(user.lastSignedInAt)
        : null,
      status: user.status,
      updatedAt: toResponseDate(user.updatedAt),
    };
  }

  static pgToResponse(user: UserPg): UserResponse {
    return {
      id: user.id,
      createdAt: toResponseDate(user.created_at),
      email: user.email,
      lastSignedInAt: user.last_signed_in_at
        ? toResponseDate(user.last_signed_in_at)
        : null,
      status: user.status,
      updatedAt: toResponseDate(user.updated_at),
    };
  }

  static toJson(user: User): UserJson {
    return {
      id: user.id,
      createdAt: user.createdAt.toISOString(),
      email: user.email,
      lastSignedInAt: user.lastSignedInAt
        ? user.lastSignedInAt.toISOString()
        : null,
      password: user.password,
      status: user.status,
      updatedAt: user.updatedAt.toISOString(),
    };
  }

  static toJsonWithState(user: User): WithPgState<UserJson, UserPg> {
    return {
      state: user.pgState,
      data: UserMapper.toJson(user),
    };
  }
}
