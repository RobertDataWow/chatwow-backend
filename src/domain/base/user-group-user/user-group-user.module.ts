import { Module } from '@nestjs/common';

import { UserGroupUserRepo } from './user-group-user.repo';
import { UserGroupUserService } from './user-group-user.service';

@Module({
  providers: [UserGroupUserRepo, UserGroupUserService],
  exports: [UserGroupUserService],
})
export class UserGroupUserModule {}
