import { ApiProperty } from '@nestjs/swagger';

import { DATE_EXAMPLE, UUID_EXAMPLE } from '@shared/common/common.constant';

export class PasswordResetTokenResponse {
  @ApiProperty({ example: UUID_EXAMPLE })
  id: string;

  @ApiProperty({ example: DATE_EXAMPLE })
  createdAt: string;

  @ApiProperty({ example: DATE_EXAMPLE })
  expireAt: string;

  @ApiProperty({ example: DATE_EXAMPLE, nullable: true })
  revokedAt: string | null;
}
