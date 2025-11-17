import { ApiProperty } from '@nestjs/swagger';

export class ProjectResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: '' })
  createdAt: string;

  @ApiProperty({ example: '' })
  updatedAt: string;

  @ApiProperty({ example: 'My Project' })
  projectName: string;

  @ApiProperty({ example: 'Project description' })
  projectDescription: string;

  @ApiProperty({ example: '# Guidelines' })
  projectGuidelineMd: string;

  @ApiProperty({ example: 'ACTIVE' })
  projectStatus: 'ACTIVE' | 'INACTIVE';
}
