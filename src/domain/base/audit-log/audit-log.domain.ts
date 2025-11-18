import type { ActionType, ActorType } from '@infra/db/db';

import { DomainEntity } from '@shared/common/common.domain';

import type {
  AuditLogNewData,
  AuditLogPg,
  AuditLogPlain,
  AuditLogUpdateData,
} from './types/audit-log.domain.type';

export class AuditLog extends DomainEntity<AuditLogPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly actorType: ActorType;
  readonly actionType: ActionType;
  readonly actionDetail: string;
  readonly createdById: string;
  readonly ownerTable: string;
  readonly ownerId: string;
  readonly rawData: any;

  constructor(plain: AuditLogPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: AuditLogNewData): AuditLog {
    return new AuditLog({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data,
    });
  }

  edit(data: AuditLogUpdateData) {
    Object.assign(this, data);
  }
}
