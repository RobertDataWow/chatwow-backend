import type { UserResponse } from '@domain/base/user/user.response';
import { UserStatusTuple } from '@domain/base/user/user.util';
import z from 'zod';

import { StandardResponse } from '@shared/http/http.response.dto';
import { zodDto } from '@shared/zod/zod.util';

const zod = z.object({
  email: z.string().optional(),
  password: z.string().optional(),
  status: z.enum(UserStatusTuple).optional(),
});

export class UpdateUserDto extends zodDto(zod) {}

class UserData {
  attributes: UserResponse;
}

class UpdateUserData {
  user: UserData;
}

export class UpdateUserResponse extends StandardResponse {
  data: UpdateUserData;
}
