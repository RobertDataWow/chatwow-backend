import { AuditLog } from './audit-log.domain';
import type { AuditLogNewData } from './types/audit-log.domain.type';

export class AuditLogFactory {
  static create(data: AuditLogNewData): AuditLog {
    return AuditLog.new(data);
  }
}
