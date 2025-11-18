import { AuditLog } from './audit-log.domain';
import type { AuditLogPlain } from './types/audit-log.domain.type';

export class AuditLogMapper {
  static fromPlain(plain: AuditLogPlain): AuditLog {
    return new AuditLog(plain);
  }
  static toPlain(domain: AuditLog): AuditLogPlain {
    return { ...domain };
  }
}
