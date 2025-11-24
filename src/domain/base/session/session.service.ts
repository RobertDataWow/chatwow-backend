import { Injectable } from '@nestjs/common';
import { randomBytes } from 'crypto';

import { ReqStorage } from '@infra/global/req-storage/req-storage.service';

import { ApiException } from '@shared/http/http.exception';

import { Session } from './session.domain';
import { SessionMapper } from './session.mapper';
import { SessionRepo } from './session.repo';

@Injectable()
export class SessionService {
  constructor(
    private repo: SessionRepo,
    private reqStorage: ReqStorage,
  ) {}

  newSession(userId: string) {
    const token = randomBytes(32).toString('hex');
    const { deviceUid } = this.reqStorage.get();
    if (!deviceUid) {
      throw new ApiException(400, 'noDeviceUid');
    }

    const session = Session.new({
      token,
      userId,
      deviceUid,
      info: this.reqStorage.getReqInfo(),
    });

    return {
      token,
      session,
    };
  }

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(session: Session) {
    this._validate(session);
    if (!session.isPersist) {
      await this.repo.create(session);
    } else {
      await this.repo.update(session.id, session);
    }
    session.setPgState(SessionMapper.toPg);
  }

  async saveBulk(sessions: Session[]) {
    return Promise.all(sessions.map((s) => this.save(s)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  async revokeAllOtherSession(session: Session) {
    return this.repo.revokeAllOtherSessions(session);
  }

  private _validate(_session: Session) {
    // validation rules
  }
}
