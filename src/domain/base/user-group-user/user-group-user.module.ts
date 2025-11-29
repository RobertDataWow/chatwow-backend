import { Module } from '@nestjs/common';

import { UserGroupUserService } from './user-group-user.service';

@Module({
  providers: [UserGroupUserService, UserGroupUserService],
  exports: [UserGroupUserService],
})
export class UserGroupUserModule {}
