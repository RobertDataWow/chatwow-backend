import { User } from '@domain/base/user/user.domain';
import { UserMapper } from '@domain/base/user/user.mapper';
import { UserService } from '@domain/base/user/user.service';
import { AuthService } from '@domain/orchestration/auth/auth.service';
import { Injectable } from '@nestjs/common';

import { CommandInterface } from '@shared/common/common.type';
import { HttpResponseMapper } from '@shared/http/http.mapper';

import { SignUpResponse, SignupDto } from './sign-up.dto';

export type SignUpDomain = User;

@Injectable()
export class SignUpCommand implements CommandInterface {
  constructor(
    private userService: UserService,
    private authService: AuthService,
  ) {}

  async exec(body: SignupDto): Promise<SignUpResponse> {
    const domain = User.new({
      email: body.email,
      password: body.password,
      status: 'ACTIVE',
    });

    this.authService.signIn(domain, body.password);
    const token = this.authService.getAccessToken(domain);

    await this.save(domain);

    return HttpResponseMapper.toSuccess({
      data: { user: { attributes: UserMapper.toResponse(domain) } },
      meta: {
        token,
      },
    });
  }

  async save(domain: SignUpDomain) {
    await this.userService.save(domain);
  }
}
