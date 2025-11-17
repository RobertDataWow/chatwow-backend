import { Module } from '@nestjs/common';

import { StoredFileRepo } from './stored-file.repo';
import { StoredFileService } from './stored-file.service';

@Module({
  providers: [StoredFileRepo, StoredFileService],
  exports: [StoredFileService],
})
export class StoredFileModule {}
