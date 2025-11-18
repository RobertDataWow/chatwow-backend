import type { UserManageProjectPlain } from './types/user-manage-project.domain.type';
import { UserManageProject } from './user-manage-project.domain';

export class UserManageProjectMapper {
  static fromPlain(plain: UserManageProjectPlain): UserManageProject {
    return new UserManageProject(plain);
  }
  static toPlain(domain: UserManageProject): UserManageProjectPlain {
    return { ...domain };
  }
}
