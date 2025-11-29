import { ReqInfo } from '@infra/global/req-storage/req-storage.common';

import { shaHashstring, uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import { SESSION_DEFAULT_EXPIRY_SECONDS } from './session.constant';
import { SessionMapper } from './session.mapper';
import type {
  SessionNewData,
  SessionPg,
  SessionPlain,
  SessionUpdateData,
} from './session.type';

export class Session extends DomainEntity<SessionPg> {
  readonly id: string;
  readonly userId: string;
  readonly tokenHash: string;
  readonly deviceUid: string;
  readonly createdAt: Date;
  readonly expireAt: Date;
  readonly revokeAt: Date | null;
  readonly info: ReqInfo;

  constructor(plain: SessionPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: SessionNewData) {
    return SessionMapper.fromPlain({
      id: uuidV7(),
      userId: data.userId,
      tokenHash: shaHashstring(data.token),
      deviceUid: data.deviceUid,
      createdAt: myDayjs().toDate(),
      expireAt: isDefined(data.expireAt)
        ? data.expireAt
        : myDayjs().add(SESSION_DEFAULT_EXPIRY_SECONDS, 'seconds').toDate(),
      revokeAt: null,
      info: data.info,
    });
  }

  static newBulk(data: SessionNewData[]) {
    return data.map((d) => Session.new(d));
  }

  edit(data: SessionUpdateData) {
    const plain: SessionPlain = {
      id: this.id,
      userId: this.userId,
      tokenHash: isDefined(data.tokenHash) ? data.tokenHash : this.tokenHash,
      deviceUid: isDefined(data.deviceUid) ? data.deviceUid : this.deviceUid,
      createdAt: this.createdAt,
      expireAt: isDefined(data.expireAt) ? data.expireAt : this.expireAt,
      revokeAt: isDefined(data.revokeAt) ? data.revokeAt : this.revokeAt,
      info: isDefined(data.info) ? data.info : this.info,
    };

    Object.assign(this, plain);
  }
}
