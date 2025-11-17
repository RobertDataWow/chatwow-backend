import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { ProjectAISummary } from './project-ai-summary.domain';
import { ProjectAISummaryMapper } from './project-ai-summary.mapper';

@Injectable()
export class ProjectAISummaryRepo extends BaseRepo {
  async create(projectAISummary: ProjectAISummary): Promise<void> {
    await this.db
      //
      .insertInto('project_ai_summaries')
      .values(ProjectAISummaryMapper.toPg(projectAISummary))
      .execute();
  }

  async update(id: string, projectAISummary: ProjectAISummary): Promise<void> {
    const data = diff(
      projectAISummary.pgState,
      ProjectAISummaryMapper.toPg(projectAISummary),
    );
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('project_ai_summaries')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<ProjectAISummary | null> {
    const projectAISummaryPg = await this.readDb
      .selectFrom('project_ai_summaries')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!projectAISummaryPg) {
      return null;
    }

    const projectAISummary =
      ProjectAISummaryMapper.fromPgWithState(projectAISummaryPg);
    return projectAISummary;
  }

  async delete(id: string): Promise<void> {
    await this.db
      //
      .deleteFrom('project_ai_summaries')
      .where('id', '=', id)
      .execute();
  }
}
