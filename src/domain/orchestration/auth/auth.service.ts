import { User } from '@domain/base/user/user.domain';
import { Injectable } from '@nestjs/common';

import { encodeUserJwt, isMatchedHash } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { ApiException } from '@shared/http/http.exception';

@Injectable()
export class AuthService {
  signIn(user: User, password: string) {
    const matched = isMatchedHash(password, user.password);
    if (!matched) {
      throw new ApiException(400, 'invalidAuth');
    }

    user.edit({
      lastSignedInAt: myDayjs().toDate(),
    });
  }

  getAccessToken(user: User) {
    return encodeUserJwt({ id: user.id });
  }
}
