import { ApiProperty } from '@nestjs/swagger';

export class ProjectAISummaryResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: null, nullable: true })
  createdAt: string | null;

  @ApiProperty({ example: '# Summary' })
  aiSummaryMd: string;
}
