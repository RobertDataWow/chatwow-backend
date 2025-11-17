import type { ZodCustomIssue } from 'zod';

export function getEnumErr(item: readonly string[]): Partial<ZodCustomIssue> {
  return {
    message: `invalidEnum allow ${item.join(',')}`,
  };
}
