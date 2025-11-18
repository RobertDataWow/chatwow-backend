import { Module } from '@nestjs/common';

import { UserManageProjectRepo } from './user-manage-project.repo';
import { UserManageProjectService } from './user-manage-project.service';

@Module({
  providers: [UserManageProjectService, UserManageProjectRepo],
  exports: [UserManageProjectService],
})
export class UserManageProjectModule {}
