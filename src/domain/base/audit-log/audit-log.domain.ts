import type { ActionType, ActorType } from '@infra/db/db';

import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';

import { AuditLogMapper } from './audit-log.mapper';
import type {
  AuditLogNewData,
  AuditLogPg,
  AuditLogPlain,
} from './types/audit-log.domain.type';

export class AuditLog extends DomainEntity<AuditLogPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly actorType: ActorType;
  readonly actionType: ActionType;
  readonly actionDetail: string;
  readonly createdById: string | null;
  readonly ownerTable: string;
  readonly ownerId: string;
  readonly rawData: any;

  constructor(plain: AuditLogPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: AuditLogNewData): AuditLog {
    return AuditLogMapper.fromPlain({
      id: uuidV7(),
      createdAt: myDayjs().toDate(),
      actorType: data.actorType,
      actionType: data.actionType,
      actionDetail: data.actionDetail || '',
      createdById: data.createdById,
      ownerTable: data.ownerTable,
      ownerId: data.ownerId,
      rawData: data.rawData,
    });
  }
}
