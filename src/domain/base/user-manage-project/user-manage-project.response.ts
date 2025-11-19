import { ApiProperty } from '@nestjs/swagger';

import { DATE_EXAMPLE, UUID_EXAMPLE } from '@shared/common/common.constant';

export class UserManageProjectResponse {
  @ApiProperty({ example: DATE_EXAMPLE })
  createdAt: string;

  @ApiProperty({ example: UUID_EXAMPLE })
  projectId: string;

  @ApiProperty({ example: UUID_EXAMPLE })
  userId: string;
}
