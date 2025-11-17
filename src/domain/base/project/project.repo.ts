import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { Project } from './project.domain';
import { ProjectMapper } from './project.mapper';

@Injectable()
export class ProjectRepo extends BaseRepo {
  async create(project: Project): Promise<void> {
    await this.db
      //
      .insertInto('projects')
      .values(ProjectMapper.toPg(project))
      .execute();
  }

  async update(id: string, project: Project): Promise<void> {
    const data = diff(project.pgState, ProjectMapper.toPg(project));
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('projects')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<Project | null> {
    const projectPg = await this.readDb
      .selectFrom('projects')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!projectPg) {
      return null;
    }

    const project = ProjectMapper.fromPgWithState(projectPg);
    return project;
  }

  async delete(id: string): Promise<void> {
    await this.db
      //
      .deleteFrom('projects')
      .where('id', '=', id)
      .execute();
  }
}
