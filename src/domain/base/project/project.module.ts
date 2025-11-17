import { Module } from '@nestjs/common';

import { ProjectRepo } from './project.repo';
import { ProjectService } from './project.service';

@Module({
  providers: [ProjectRepo, ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
