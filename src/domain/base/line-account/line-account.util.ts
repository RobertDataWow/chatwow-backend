import type { EB } from '@infra/db/db.common';

export function lineAccountsTableFilter(eb: EB<'line_accounts'>) {
  // no base filter
  return eb.and([]);
}
