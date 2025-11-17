import { ApiProperty } from '@nestjs/swagger';

import type { UsersStatus } from '@infra/db/db';

export class UserResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: '' })
  createdAt: string;

  @ApiProperty({ example: '' })
  updatedAt: string;

  @ApiProperty({ example: 'rob@example.com' })
  email: string;

  @ApiProperty({ example: '' })
  lastSignedInAt: string | null;

  @ApiProperty({ example: 'ACTIVE' satisfies UsersStatus })
  status: UsersStatus;
}
