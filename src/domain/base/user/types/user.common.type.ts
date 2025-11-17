import type { UsersStatus } from '@infra/db/db';

import type { PaginationQuery } from '@shared/common/common.pagintaion';
import type { ParsedSort } from '@shared/common/common.type';

export type UserSortKey = 'id' | 'createdAt';

export type UserQueryOptions = {
  filter?: {
    email?: string;
    status?: UsersStatus;
  };
  sort?: ParsedSort<UserSortKey>;
  pagination?: PaginationQuery;
};
