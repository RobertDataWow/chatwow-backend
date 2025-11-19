import { ApiProperty } from '@nestjs/swagger';

import type { UserRole, UserStatus } from '@infra/db/db.d';

import { DATE_EXAMPLE, UUID_EXAMPLE } from '@shared/common/common.constant';

export class UserResponse {
  @ApiProperty({ example: UUID_EXAMPLE })
  id: string;

  @ApiProperty({ example: DATE_EXAMPLE })
  createdAt: string;

  @ApiProperty({ example: DATE_EXAMPLE })
  updatedAt: string;

  @ApiProperty({ example: 'firstname' })
  firstName: string;

  @ApiProperty({ example: 'lastname' })
  lastName: string;

  @ApiProperty({ example: DATE_EXAMPLE })
  lastSignedInAt: string | null;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'USER' satisfies UserRole })
  role: UserRole;

  @ApiProperty({ example: 'ACTIVE' satisfies UserStatus })
  userStatus: UserStatus;

  @ApiProperty({ example: '1xq2sqwe12', nullable: true })
  lineAccountId: string | null;
}
