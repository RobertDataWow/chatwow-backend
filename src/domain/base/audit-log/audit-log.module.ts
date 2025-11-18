import { Module } from '@nestjs/common';

import { AuditLogRepo } from './audit-log.repo';
import { AuditLogService } from './audit-log.service';

@Module({
  providers: [AuditLogService, AuditLogRepo],
  exports: [AuditLogService],
})
export class AuditLogModule {}
