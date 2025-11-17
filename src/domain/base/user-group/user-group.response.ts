import { ApiProperty } from '@nestjs/swagger';

export class UserGroupResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: 'Admin Group' })
  groupName: string;

  @ApiProperty({ example: 'Group for administrators' })
  description: string;
}
