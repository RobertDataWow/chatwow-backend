import { Injectable } from '@nestjs/common';

import { UserManageProjectRepo } from './user-manage-project.repo';

@Injectable()
export class UserManageProjectService {
  constructor(private readonly repo: UserManageProjectRepo) {}

  async saveUserRelations(userGroupId: string, projectIds: string[]) {
    return this.repo.saveUserRelations(userGroupId, projectIds);
  }

  async saveProjectRelations(projectId: string, userGroupIds: string[]) {
    return this.repo.saveProjectRelations(projectId, userGroupIds);
  }
}
