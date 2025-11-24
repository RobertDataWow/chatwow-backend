import type { EB } from '@infra/db/db.common';

export function sessionsTableFilter(eb: EB<'sessions'>) {
  // no base filter
  return eb.and([]);
}
