import { Injectable } from '@nestjs/common';

import { UserManageProjectRepo } from './user-manage-project.repo';

@Injectable()
export class UserManageProjectService {
  constructor(private readonly repo: UserManageProjectRepo) {}
  // Implement service methods here
}
