import type { UnionToTuple } from 'type-fest';

import type { UsersStatus } from '@infra/db/db';

export const UserStatusTuple: UnionToTuple<UsersStatus> = [
  'ACTIVE',
  'INACTIVE',
] as const;
