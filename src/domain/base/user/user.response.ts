import { ApiProperty } from '@nestjs/swagger';

import type { UserRole, UserStatus } from '@infra/db/db.d';

export class UserResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: '' })
  createdAt: string;

  @ApiProperty({ example: '' })
  updatedAt: string;

  @ApiProperty({ example: 'user@example.com' })
  email: string;

  @ApiProperty({ example: 'USER' satisfies UserRole })
  role: UserRole;

  @ApiProperty({ example: 'ACTIVE' satisfies UserStatus })
  userStatus: UserStatus;

  @ApiProperty({ example: null, nullable: true })
  lineUid: string | null;
}
