import { Injectable } from '@nestjs/common';

import { UserQueryOptions } from './types/user.common.type';
import { User } from './user.domain';
import { UserMapper } from './user.mapper';
import { UserRepo } from './user.repo';

@Injectable()
export class UserService {
  constructor(private repo: UserRepo) {}

  async findIds(opts?: UserQueryOptions) {
    return this.repo.findIds(opts);
  }

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(user: User) {
    this._validate(user);

    if (!user.isPersist) {
      await this.repo.create(user);
    } else {
      await this.repo.update(user.id, user);
    }

    user.setPgState(UserMapper.toPg);
  }

  async saveBulk(users: User[]) {
    return Promise.all(users.map((u) => this.save(u)));
  }

  private _validate(_user: User) {
    // no rule for now
  }
}
