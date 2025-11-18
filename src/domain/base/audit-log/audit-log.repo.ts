import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { AuditLog } from './audit-log.domain';
import { AuditLogMapper } from './audit-log.mapper';

@Injectable()
export class AuditLogRepo extends BaseRepo {
  async create(auditLog: AuditLog): Promise<void> {
    await this.db
      //
      .insertInto('audit_logs')
      .values(AuditLogMapper.toPg(auditLog))
      .execute();
  }

  async update(id: string, auditLog: AuditLog): Promise<void> {
    const data = diff(auditLog.pgState, AuditLogMapper.toPg(auditLog));
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('audit_logs')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<AuditLog | null> {
    const userPg = await this.readDb
      .selectFrom('audit_logs')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!userPg) {
      return null;
    }

    const auditLog = AuditLogMapper.fromPgWithState(userPg);
    return auditLog;
  }

  async delete(id: string): Promise<void> {
    await this.db
      //
      .deleteFrom('audit_logs')
      .where('id', '=', id)
      .execute();
  }
}
