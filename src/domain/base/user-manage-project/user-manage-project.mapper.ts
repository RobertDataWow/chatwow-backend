import { toDate, toISO } from '@shared/common/common.transformer';

import type {
  UserManageProjectPg,
  UserManageProjectPlain,
} from './types/user-manage-project.domain.type';
import { UserManageProject } from './user-manage-project.domain';
import type { UserManageProjectResponse } from './user-manage-project.response';

export class UserManageProjectMapper {
  static fromPg(pg: UserManageProjectPg): UserManageProject {
    const plain: UserManageProjectPlain = {
      id: pg.id,
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
      id: plain.id,
      createdAt: plain.createdAt,
      projectId: plain.projectId,
      userId: plain.userId,
    });
  }

  static toPg(domain: UserManageProjectPlain): UserManageProjectPg {
    return {
      id: domain.id,
      created_at: toISO(domain.createdAt),
      project_id: domain.projectId,
      user_id: domain.userId,
    };
  }

  static toPlain(domain: UserManageProject): UserManageProjectPlain {
    return {
      id: domain.id,
      createdAt: domain.createdAt,
      projectId: domain.projectId,
      userId: domain.userId,
    };
  }

  static toResponse(domain: UserManageProject): UserManageProjectResponse {
    return {
      id: domain.id,
      createdAt: toISO(domain.createdAt),
      projectId: domain.projectId,
      userId: domain.userId,
    };
  }
}
