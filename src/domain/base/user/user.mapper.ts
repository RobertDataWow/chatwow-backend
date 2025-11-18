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

  static toPg(domain: User): UserPg {
    return {
      id: domain.id,
      last_signed_in_at: toISO(domain.lastSignedInAt),
      created_at: toISO(domain.createdAt),
      updated_at: toISO(domain.updatedAt),
      email: domain.email,
      password: domain.password,
      role: domain.role,
      user_status: domain.userStatus,
      line_account_id: domain.lineAccountId,
    };
  }

  static toPlain(domain: User): UserPlain {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      updatedAt: domain.updatedAt,
      lastSignedInAt: domain.lastSignedInAt,
      email: domain.email,
      password: domain.password,
      role: domain.role,
      userStatus: domain.userStatus,
      lineAccountId: domain.lineAccountId,
    };
  }

  static toJson(domain: User): UserJson {
    return {
      id: domain.id,
      createdAt: toISO(domain.createdAt),
      updatedAt: toISO(domain.updatedAt),
      lastSignedInAt: toISO(domain.updatedAt),
      email: domain.email,
      password: domain.password,
      role: domain.role,
      userStatus: domain.userStatus,
      lineAccountId: domain.lineAccountId,
    };
  }

  static toResponse(domain: User): UserResponse {
    return {
      id: domain.id,
      createdAt: toResponseDate(domain.createdAt),
      updatedAt: toResponseDate(domain.updatedAt),
      lastSignedInAt: toResponseDate(domain.lastSignedInAt),
      email: domain.email,
      role: domain.role,
      userStatus: domain.userStatus,
      lineAccountId: domain.lineAccountId,
    };
  }
}
