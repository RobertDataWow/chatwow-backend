import type { EB } from '@infra/db/db.common';

export function lineSessionsTableFilter(eb: EB<'line_sessions'>) {
  // no base filter
  return eb.and([]);
}
