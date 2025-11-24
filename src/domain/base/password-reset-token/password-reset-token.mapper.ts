import {
  toDate,
  toISO,
  toResponseDate,
} from '@shared/common/common.transformer';

import { PasswordResetToken } from './password-reset-token.domain';
import { PasswordResetTokenResponse } from './password-reset-token.response';
import type {
  PasswordResetTokenJson,
  PasswordResetTokenPg,
  PasswordResetTokenPlain,
} from './types/password-reset-token.domain.type';

export class PasswordResetTokenMapper {
  static fromPg(pg: PasswordResetTokenPg): PasswordResetToken {
    const plain: PasswordResetTokenPlain = {
      id: pg.id,
      userId: pg.user_id,
      tokenHash: pg.token_hash,
      createdAt: toDate(pg.created_at),
      expireAt: toDate(pg.expire_at),
      usedAt: toDate(pg.used_at),
    };

    return new PasswordResetToken(plain);
  }

  static fromPgWithState(pg: PasswordResetTokenPg): PasswordResetToken {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: PasswordResetTokenPlain): PasswordResetToken {
    const plain: PasswordResetTokenPlain = {
      id: plainData.id,
      userId: plainData.userId,
      tokenHash: plainData.tokenHash,
      createdAt: plainData.createdAt,
      expireAt: plainData.expireAt,
      usedAt: plainData.usedAt,
    };

    return new PasswordResetToken(plain);
  }

  static toPg(t: PasswordResetToken): PasswordResetTokenPg {
    return {
      id: t.id,
      user_id: t.userId,
      token_hash: t.tokenHash,
      created_at: toISO(t.createdAt),
      expire_at: toISO(t.expireAt),
      used_at: toISO(t.usedAt),
    } as unknown as PasswordResetTokenPg;
  }

  static toPlain(t: PasswordResetToken): PasswordResetTokenPlain {
    return {
      id: t.id,
      userId: t.userId,
      tokenHash: t.tokenHash,
      createdAt: t.createdAt,
      expireAt: t.expireAt,
      usedAt: t.usedAt,
    };
  }

  static toJson(t: PasswordResetToken): PasswordResetTokenJson {
    return {
      id: t.id,
      userId: t.userId,
      tokenHash: t.tokenHash,
      createdAt: toISO(t.createdAt),
      expireAt: toISO(t.expireAt),
      usedAt: toISO(t.usedAt),
    } as unknown as PasswordResetTokenJson;
  }

  static toResponse(t: PasswordResetToken): PasswordResetTokenResponse {
    return {
      id: t.id,
      userId: t.userId,
      createdAt: toResponseDate(t.createdAt),
      expireAt: toResponseDate(t.expireAt),
      usedAt: toResponseDate(t.usedAt),
    };
  }
}
