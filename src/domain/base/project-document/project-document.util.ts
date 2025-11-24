import type { EB, SelectAnyQB } from '@infra/db/db.common';
import { UserClaims } from '@infra/middleware/jwt/jwt.common';

export function projectDocumentsTableFilter(eb: EB<'project_documents'>) {
  // no base filter
  return eb.and([]);
}

export function addProjectDocumentActorFilter<
  T extends SelectAnyQB<'project_documents'>,
>(q: T, actor: UserClaims): T {
  if (actor.role !== 'MANAGER') {
    return q;
  }

  return q
    .leftJoin('projects', 'projects.id', 'project_documents.project_id')
    .leftJoin(
      'user_manage_projects',
      'user_manage_projects.project_id',
      'projects.id',
    )
    .where((eb) =>
      eb.or([
        eb('user_manage_projects.user_id', '=', actor.userId),
        eb('projects.created_by_id', '=', actor.userId),
      ]),
    ) as T;
}
