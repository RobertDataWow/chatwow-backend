import type {
  UserJson,
  UserPg,
} from '@domain/base/user/types/user.domain.type';

import type { WithPgState } from '@shared/common/common.type';

export type SendOtpJobData = WithPgState<UserJson, UserPg>;
