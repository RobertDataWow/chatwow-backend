import { Module } from '@nestjs/common';

import { UserGroupService } from './user-group.service';

@Module({
  providers: [UserGroupService],
  exports: [UserGroupService],
})
export class UserGroupModule {}
