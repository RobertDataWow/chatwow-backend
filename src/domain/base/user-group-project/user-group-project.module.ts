import { Module } from '@nestjs/common';

import { UserGroupProjectService } from './user-group-project.service';

@Module({
  providers: [UserGroupProjectService, UserGroupProjectService],
  exports: [UserGroupProjectService],
})
export class UserGroupProjectModule {}
