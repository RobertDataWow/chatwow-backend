import { Module } from '@nestjs/common';

import { UserGroupProjectRepo } from './user-group-project.repo';
import { UserGroupProjectService } from './user-group-project.service';

@Module({
  providers: [UserGroupProjectRepo, UserGroupProjectService],
  exports: [UserGroupProjectService],
})
export class UserGroupProjectModule {}
