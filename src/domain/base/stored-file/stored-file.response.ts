import { ApiProperty } from '@nestjs/swagger';

import { UUID_EXAMPLE } from '@shared/common/common.constant';

export class StoredFileResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: 'document.pdf' })
  filename: string;

  @ApiProperty({ example: 1024, nullable: true })
  filesizeByte: number | null;

  @ApiProperty({ example: null, nullable: true })
  presignUrl: string | null;

  @ApiProperty({ example: '', nullable: true })
  createdAt: string | null;

  @ApiProperty({ example: '', nullable: true })
  updatedAt: string | null;

  @ApiProperty({ example: 'application/pdf', nullable: true })
  mimeType: string | null;

  @ApiProperty({ example: 'pdf', nullable: true })
  extension: string | null;
}

export class PresignUploadResponse {
  @ApiProperty({ example: UUID_EXAMPLE })
  id: string;

  @ApiProperty({ example: 'https://presigned-upload-url' })
  presignUrl: string;
}
