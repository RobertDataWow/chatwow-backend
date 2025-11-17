import { ApiProperty } from '@nestjs/swagger';

export class UserGroupProjectResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: '', nullable: true })
  projectId: string | null;

  @ApiProperty({ example: '', nullable: true })
  userGroupId: string | null;
}
