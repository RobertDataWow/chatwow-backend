import { Module } from '@nestjs/common';

import { ProjectDocumentRepo } from './project-document.repo';
import { ProjectDocumentService } from './project-document.service';

@Module({
  providers: [ProjectDocumentRepo, ProjectDocumentService],
  exports: [ProjectDocumentService],
})
export class ProjectDocumentModule {}
