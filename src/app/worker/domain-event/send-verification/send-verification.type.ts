import type { UserJson, UserPg } from '@domain/base/user/user.type';

import type { WithPgState } from '@shared/common/common.type';

export type SendVerificationJobData = WithPgState<UserJson, UserPg>;
