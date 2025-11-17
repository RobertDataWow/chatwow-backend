import { Module } from '@nestjs/common';

import { UserGroupRepo } from './user-group.repo';
import { UserGroupService } from './user-group.service';

@Module({
  providers: [UserGroupRepo, UserGroupService],
  exports: [UserGroupService],
})
export class UserGroupModule {}
