import { JsonValue } from '@infra/db/db';
import { ReqInfo } from '@infra/global/req-storage/req-storage.common';

import {
  toDate,
  toISO,
  toResponseDate,
} from '@shared/common/common.transformer';

import { Session } from './session.domain';
import { SessionResponse } from './session.response';
import type {
  SessionJson,
  SessionPg,
  SessionPlain,
} from './types/session.domain.type';

export class SessionMapper {
  static fromPg(pg: SessionPg): Session {
    const plain: SessionPlain = {
      id: pg.id,
      userId: pg.user_id,
      tokenHash: pg.token_hash,
      deviceUid: pg.device_uid,
      createdAt: toDate(pg.created_at),
      expireAt: toDate(pg.expire_at),
      revokeAt: toDate(pg.revoke_at),
      info: pg.info as ReqInfo,
    };

    return new Session(plain);
  }

  static fromPgWithState(pg: SessionPg): Session {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: SessionPlain): Session {
    const plain: SessionPlain = {
      id: plainData.id,
      userId: plainData.userId,
      tokenHash: plainData.tokenHash,
      deviceUid: plainData.deviceUid,
      createdAt: plainData.createdAt,
      expireAt: plainData.expireAt,
      revokeAt: plainData.revokeAt,
      info: plainData.info,
    };

    return new Session(plain);
  }

  static toPg(s: Session): SessionPg {
    return {
      id: s.id,
      user_id: s.userId,
      token_hash: s.tokenHash,
      device_uid: s.deviceUid,
      created_at: toISO(s.createdAt),
      expire_at: toISO(s.expireAt),
      revoke_at: toISO(s.revokeAt),
      info: s.info as JsonValue,
    };
  }

  static toPlain(s: Session): SessionPlain {
    return {
      id: s.id,
      userId: s.userId,
      tokenHash: s.tokenHash,
      deviceUid: s.deviceUid,
      createdAt: s.createdAt,
      expireAt: s.expireAt,
      revokeAt: s.revokeAt,
      info: s.info,
    };
  }

  static toJson(s: Session): SessionJson {
    return {
      id: s.id,
      userId: s.userId,
      tokenHash: s.tokenHash,
      deviceUid: s.deviceUid,
      createdAt: toISO(s.createdAt),
      expireAt: toISO(s.expireAt),
      revokeAt: toISO(s.revokeAt),
      info: s.info,
    } as unknown as SessionJson;
  }

  static toResponse(s: Session): SessionResponse {
    return {
      id: s.id,
      createdAt: toResponseDate(s.createdAt),
      expireAt: toResponseDate(s.expireAt),
      revokeAt: toResponseDate(s.revokeAt),
    };
  }
}
