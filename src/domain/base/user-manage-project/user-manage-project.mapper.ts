import { toDate, toISO } from '@shared/common/common.transformer';

import type {
  UserManageProjectPg,
  UserManageProjectPlain,
} from './user-manage-project.type';
import { UserManageProject } from './user-manage-project.domain';
import type { UserManageProjectResponse } from './user-manage-project.response';

export class UserManageProjectMapper {
  static fromPg(pg: UserManageProjectPg): UserManageProject {
    const plain: UserManageProjectPlain = {
      createdAt: toDate(pg.created_at),
      projectId: pg.project_id,
      userId: pg.user_id,
    };

    return new UserManageProject(plain);
  }

  static fromPgWithState(pg: UserManageProjectPg): UserManageProject {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plain: UserManageProjectPlain): UserManageProject {
    return new UserManageProject({
      createdAt: plain.createdAt,
      projectId: plain.projectId,
      userId: plain.userId,
    });
  }

  static toPg(domain: UserManageProjectPlain): UserManageProjectPg {
    return {
      created_at: toISO(domain.createdAt),
      project_id: domain.projectId,
      user_id: domain.userId,
    };
  }

  static toPlain(domain: UserManageProject): UserManageProjectPlain {
    return {
      createdAt: domain.createdAt,
      projectId: domain.projectId,
      userId: domain.userId,
    };
  }

  static toResponse(domain: UserManageProject): UserManageProjectResponse {
    return {
      createdAt: toISO(domain.createdAt),
      projectId: domain.projectId,
      userId: domain.userId,
    };
  }
}
