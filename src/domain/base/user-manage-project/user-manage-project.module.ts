import { Module } from '@nestjs/common';

import { UserManageProjectService } from './user-manage-project.service';

@Module({
  providers: [UserManageProjectService, UserManageProjectService],
  exports: [UserManageProjectService],
})
export class UserManageProjectModule {}
