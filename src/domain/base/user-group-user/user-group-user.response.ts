import { ApiProperty } from '@nestjs/swagger';

export class UserGroupUserResponse {
  @ApiProperty({ example: '', nullable: true })
  userId: string | null;

  @ApiProperty({ example: '', nullable: true })
  userGroupId: string | null;
}
