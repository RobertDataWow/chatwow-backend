import { Injectable } from '@nestjs/common';

import { UserGroupUserRepo } from './user-group-user.repo';

@Injectable()
export class UserGroupUserService {
  constructor(private repo: UserGroupUserRepo) {}

  async saveUserRelations(userId: string, userGroupIds: string[]) {
    return this.repo.saveUserRelations(userId, userGroupIds);
  }

  async saveUserGroupRelations(userGroupId: string, userIds: string[]) {
    return this.repo.saveUserGroupRelations(userGroupId, userIds);
  }
}
