import { Injectable } from '@nestjs/common';

import { AuditLogRepo } from './audit-log.repo';

@Injectable()
export class AuditLogService {
  constructor(private readonly repo: AuditLogRepo) {}
  // Implement service methods here
}
