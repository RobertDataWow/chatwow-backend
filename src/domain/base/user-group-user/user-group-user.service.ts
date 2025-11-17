import { Injectable } from '@nestjs/common';

import { UserGroupUser } from './user-group-user.domain';
import { UserGroupUserMapper } from './user-group-user.mapper';
import { UserGroupUserRepo } from './user-group-user.repo';

@Injectable()
export class UserGroupUserService {
  constructor(private repo: UserGroupUserRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(userGroupUser: UserGroupUser) {
    this._validate(userGroupUser);

    if (!userGroupUser.isPersist) {
      await this.repo.create(userGroupUser);
    } else {
      await this.repo.update(userGroupUser.id, userGroupUser);
    }

    userGroupUser.setPgState(UserGroupUserMapper.toPg);
  }

  async saveBulk(userGroupUsers: UserGroupUser[]) {
    return Promise.all(userGroupUsers.map((u) => this.save(u)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private _validate(_userGroupUser: UserGroupUser) {
    // validation rules can be added here
  }
}
