import { Injectable } from '@nestjs/common';

import myDayjs from '@shared/common/common.dayjs';
import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { Session } from './session.domain';
import { SessionMapper } from './session.mapper';

@Injectable()
export class SessionRepo extends BaseRepo {
  async create(session: Session): Promise<void> {
    await this.db
      .insertInto('sessions')
      .values(SessionMapper.toPg(session))
      .execute();
  }

  async update(id: string, session: Session): Promise<void> {
    const data = diff(session.pgState, SessionMapper.toPg(session));
    if (!data) return;
    await this.db
      .updateTable('sessions')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<Session | null> {
    const pg = await this.readDb
      .selectFrom('sessions')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();
    if (!pg) return null;
    return SessionMapper.fromPgWithState(pg);
  }

  async delete(id: string): Promise<void> {
    await this.db.deleteFrom('sessions').where('id', '=', id).execute();
  }

  async revokeAllOtherSessions(session: Session) {
    await this.db
      .updateTable('sessions')
      .set('revoke_at', myDayjs().toISOString())
      .where('device_uid', '=', session.deviceUid)
      .where('user_id', '=', session.userId)
      .where('id', '!=', session.id)
      .execute();
  }
}
