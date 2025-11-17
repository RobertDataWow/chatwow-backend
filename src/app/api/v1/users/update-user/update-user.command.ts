import { User } from '@domain/base/user/user.domain';
import { UserMapper } from '@domain/base/user/user.mapper';
import { UserService } from '@domain/base/user/user.service';
import { Inject, Injectable } from '@nestjs/common';

import { READ_DB, ReadDB } from '@infra/db/db.common';

import { CommandInterface } from '@shared/common/common.type';
import { ApiException } from '@shared/http/http.exception';
import { HttpResponseMapper } from '@shared/http/http.mapper';

import { UpdateUserDto, UpdateUserResponse } from './update-user.dto';

export type UpdateUserDomain = User;

@Injectable()
export class UpdateUserCommand implements CommandInterface {
  constructor(
    @Inject(READ_DB)
    private db: ReadDB,
    private userService: UserService,
  ) {}

  async temp() {
    return this.db.selectFrom('users').selectAll().execute();
  }

  async exec(id: string, body: UpdateUserDto): Promise<UpdateUserResponse> {
    const user = await this.find(id);

    user.edit({
      email: body.email,
      password: body.password,
    });

    await this.save(user);

    return HttpResponseMapper.toSuccess({
      data: { user: { attributes: UserMapper.toResponse(user) } },
    });
  }

  async find(id: string): Promise<UpdateUserDomain> {
    const userModel = await this.db
      .selectFrom('users')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!userModel) {
      throw new ApiException(400, 'notFound');
    }

    return UserMapper.fromPgWithState(userModel);
  }

  async save(user: UpdateUserDomain) {
    await this.userService.save(user);
  }
}
