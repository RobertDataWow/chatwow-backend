import { Module } from '@nestjs/common';

import { ProjectAISummaryRepo } from './project-ai-summary.repo';
import { ProjectAISummaryService } from './project-ai-summary.service';

@Module({
  providers: [ProjectAISummaryRepo, ProjectAISummaryService],
  exports: [ProjectAISummaryService],
})
export class ProjectAISummaryModule {}
