import type { EB } from '@infra/db/db.common';

export function lineBotsTableFilter(eb: EB<'line_bots'>) {
  // no base filter
  return eb.and([]);
}
