import type { EB } from '@infra/db/db.common';

export function projectDocumentsTableFilter(eb: EB<'project_documents'>) {
  // no base filter
  return eb.and([]);
}
