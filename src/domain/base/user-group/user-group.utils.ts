import type { EB } from '@infra/db/db.common';

export function userGroupsTableFilter(eb: EB<'user_groups'>) {
  // no base filter
  return eb.and([]);
}
