import type {
  UserGroupProjectJson,
  UserGroupProjectPg,
  UserGroupProjectPlain,
} from './user-group-project.type';
import { UserGroupProject } from './user-group-project.domain';

export class UserGroupProjectMapper {
  static fromPg(pg: UserGroupProjectPg): UserGroupProject {
    const plain: UserGroupProjectPlain = {
      projectId: pg.project_id,
      userGroupId: pg.user_group_id,
    };

    return new UserGroupProject(plain);
  }

  static fromPgWithState(pg: UserGroupProjectPg): UserGroupProject {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: UserGroupProjectPlain): UserGroupProject {
    const plain: UserGroupProjectPlain = {
      projectId: plainData.projectId,
      userGroupId: plainData.userGroupId,
    };

    return new UserGroupProject(plain);
  }

  static fromJson(json: UserGroupProjectJson): UserGroupProject {
    const plain: UserGroupProjectPlain = {
      projectId: json.projectId,
      userGroupId: json.userGroupId,
    };

    return new UserGroupProject(plain);
  }

  static toPg(userGroupProject: UserGroupProjectPlain): UserGroupProjectPg {
    return {
      project_id: userGroupProject.projectId,
      user_group_id: userGroupProject.userGroupId,
    };
  }

  static toPlain(userGroupProject: UserGroupProject): UserGroupProjectPlain {
    return {
      projectId: userGroupProject.projectId,
      userGroupId: userGroupProject.userGroupId,
    };
  }

  static toJson(userGroupProject: UserGroupProject): UserGroupProjectJson {
    return {
      projectId: userGroupProject.projectId,
      userGroupId: userGroupProject.userGroupId,
    };
  }
}
