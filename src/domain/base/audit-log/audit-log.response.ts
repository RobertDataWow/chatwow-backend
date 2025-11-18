import { ApiProperty } from '@nestjs/swagger';

import type { ActionType, ActorType } from '@infra/db/db';

import { DATE_EXAMPLE, UUID_EXAMPLE } from '@shared/common/common.constant';

export class AuditLogResponse {
  @ApiProperty({ example: UUID_EXAMPLE })
  id: string;

  @ApiProperty({ example: DATE_EXAMPLE })
  createdAt: string;

  @ApiProperty({ example: 'SYSTEM' satisfies ActorType })
  actorType: ActorType;

  @ApiProperty({ example: 'CREATE' satisfies ActionType })
  actionType: ActionType;

  @ApiProperty({ example: 'details example' })
  actionDetail: string;
}
