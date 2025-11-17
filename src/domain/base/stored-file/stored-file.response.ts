import { ApiProperty } from '@nestjs/swagger';

export class StoredFileResponse {
  @ApiProperty({ example: '' })
  id: string;

  @ApiProperty({ example: 'ref-name' })
  refName: string;

  @ApiProperty({ example: 's3/path/to/file' })
  keyPath: string;

  @ApiProperty({ example: 'users' })
  ownerTable: string;

  @ApiProperty({ example: '' })
  ownerId: string;

  @ApiProperty({ example: 'document.pdf' })
  filename: string;

  @ApiProperty({ example: 1024, nullable: true })
  filesizeByte: number | null;

  @ApiProperty({ example: 's3', nullable: true })
  storageName: string | null;

  @ApiProperty({ example: null, nullable: true })
  presignUrl: string | null;

  @ApiProperty({ example: false, nullable: true })
  isPublic: boolean | null;

  @ApiProperty({ example: '', nullable: true })
  createdAt: string | null;

  @ApiProperty({ example: '', nullable: true })
  updatedAt: string | null;

  @ApiProperty({ example: 'application/pdf', nullable: true })
  mimeType: string | null;

  @ApiProperty({ example: 'pdf', nullable: true })
  extension: string | null;

  @ApiProperty({ example: 'abc123', nullable: true })
  checksum: string | null;

  @ApiProperty({ example: null, nullable: true })
  expireAt: string | null;
}
