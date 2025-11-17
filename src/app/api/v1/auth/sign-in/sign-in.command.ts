import { User } from '@domain/base/user/user.domain';
import { UserMapper } from '@domain/base/user/user.mapper';
import { UserService } from '@domain/base/user/user.service';
import { AuthService } from '@domain/orchestration/auth/auth.service';
import { EventDispatch } from '@domain/orchestration/queue/event.dispatch';
import { Inject, Injectable } from '@nestjs/common';

import { READ_DB, ReadDB } from '@infra/db/db.common';

import { CommandInterface } from '@shared/common/common.type';
import { ApiException } from '@shared/http/http.exception';
import { HttpResponseMapper } from '@shared/http/http.mapper';

import { SignInDto, SignInResponse } from './sign-in.dto';

@Injectable()
export class SignInCommand implements CommandInterface {
  constructor(
    @Inject(READ_DB)
    private db: ReadDB,
    private authService: AuthService,
    private userService: UserService,
    private eventDispatch: EventDispatch,
  ) {}

  async exec(body: SignInDto): Promise<SignInResponse> {
    const domain = await this.find(body.email);

    this.authService.signIn(domain, body.password);
    const token = this.authService.getAccessToken(domain);

    await this.save(domain);
    this.eventDispatch.signIn(domain);

    return HttpResponseMapper.toSuccess({
      data: { user: { attributes: UserMapper.toResponse(domain) } },
      meta: {
        token,
      },
    });
  }

  async find(email: string): Promise<User> {
    const userModel = await this.db
      //
      .selectFrom('users')
      .selectAll()
      .where('email', '=', email)
      .executeTakeFirst();

    if (!userModel) {
      throw new ApiException(400, 'usersNotFound');
    }

    return UserMapper.fromPgWithState(userModel);
  }

  async save(domain: User) {
    await this.userService.save(domain);
  }
}
