import type { EB } from '@infra/db/db.common';

export function passwordResetTokensTableFilter(
  eb: EB<'password_reset_tokens'>,
) {
  // no base filter
  return eb.and([]);
}
