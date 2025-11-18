import type { UserManageProjectNewData } from './types/user-manage-project.domain.type';
import { UserManageProject } from './user-manage-project.domain';

export class UserManageProjectFactory {
  static create(data: UserManageProjectNewData): UserManageProject {
    return UserManageProject.new(data);
  }
}
