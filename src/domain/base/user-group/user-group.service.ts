import { Injectable } from '@nestjs/common';

import { UserClaims } from '@infra/middleware/jwt/jwt.common';

import { UserGroup } from './user-group.domain';
import { UserGroupMapper } from './user-group.mapper';
import { UserGroupRepo } from './user-group.repo';
import {
  UserGroupFilterOptions,
  UserGroupQueryOptions,
} from './user-group.zod';

@Injectable()
export class UserGroupService {
  constructor(private repo: UserGroupRepo) {}

  async getIds(opts?: UserGroupQueryOptions) {
    return this.repo.getIds(opts);
  }

  async getCount(opts?: UserGroupFilterOptions) {
    return this.repo.getCount(opts);
  }

  async findOne(id: string, actor?: UserClaims) {
    return this.repo.findOne(id, actor);
  }

  async save(userGroup: UserGroup) {
    this._validate(userGroup);

    if (!userGroup.isPersist) {
      await this.repo.create(userGroup);
    } else {
      await this.repo.update(userGroup.id, userGroup);
    }

    userGroup.setPgState(UserGroupMapper.toPg);
  }

  async saveBulk(userGroups: UserGroup[]) {
    return Promise.all(userGroups.map((u) => this.save(u)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private _validate(_userGroup: UserGroup) {
    // validation rules can be added here
  }
}
