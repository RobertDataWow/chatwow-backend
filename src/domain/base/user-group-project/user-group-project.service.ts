import { Injectable } from '@nestjs/common';

import { UserGroupProject } from './user-group-project.domain';
import { UserGroupProjectMapper } from './user-group-project.mapper';
import { UserGroupProjectRepo } from './user-group-project.repo';

@Injectable()
export class UserGroupProjectService {
  constructor(private repo: UserGroupProjectRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(userGroupProject: UserGroupProject) {
    this._validate(userGroupProject);

    if (!userGroupProject.isPersist) {
      await this.repo.create(userGroupProject);
    } else {
      await this.repo.update(userGroupProject.id, userGroupProject);
    }

    userGroupProject.setPgState(UserGroupProjectMapper.toPg);
  }

  async saveBulk(userGroupProjects: UserGroupProject[]) {
    return Promise.all(userGroupProjects.map((u) => this.save(u)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private _validate(_userGroupProject: UserGroupProject) {
    // validation rules can be added here
  }
}
