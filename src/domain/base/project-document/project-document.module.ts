import { Module } from '@nestjs/common';

import { ProjectDocumentService } from './project-document.service';

@Module({
  providers: [ProjectDocumentService, ProjectDocumentService],
  exports: [ProjectDocumentService],
})
export class ProjectDocumentModule {}
