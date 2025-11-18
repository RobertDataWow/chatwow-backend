import { Injectable } from '@nestjs/common';

import { AuditLog } from './audit-log.domain';
import { AuditLogMapper } from './audit-log.mapper';
import { AuditLogRepo } from './audit-log.repo';

@Injectable()
export class AuditLogService {
  constructor(private readonly repo: AuditLogRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(auditLog: AuditLog) {
    this._validate(auditLog);

    if (!auditLog.isPersist) {
      await this.repo.create(auditLog);
    } else {
      await this.repo.update(auditLog.id, auditLog);
    }

    auditLog.setPgState(AuditLogMapper.toPg);
  }

  async saveBulk(lineSessions: AuditLog[]) {
    return Promise.all(lineSessions.map((u) => this.save(u)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private _validate(_lineSession: AuditLog) {
    // validation rules can be added here
  }
}
