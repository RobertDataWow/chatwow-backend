import type { UserResponse } from '@domain/base/user/user.response';
import z from 'zod';

import { StandardResponse } from '@shared/http/http.response.dto';
import { zodDto } from '@shared/zod/zod.util';

const zod = z.object({
  email: z.string().email(),
  password: z.string(),
});

export class SignupDto extends zodDto(zod) {}

class UserData {
  attributes: UserResponse;
}

class SignUpData {
  user: UserData;
}
export class SignUpResponse extends StandardResponse {
  data: SignUpData;
  meta: {
    token: string;
  };
}
