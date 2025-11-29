import type { UserManageProjectNewData } from './user-manage-project.type';
import { UserManageProject } from './user-manage-project.domain';

export class UserManageProjectFactory {
  static create(data: UserManageProjectNewData): UserManageProject {
    return UserManageProject.new(data);
  }
}
