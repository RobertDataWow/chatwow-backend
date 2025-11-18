import { ApiProperty } from '@nestjs/swagger';

export class LineAccountResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: '' })
  createdAt: string;
}
