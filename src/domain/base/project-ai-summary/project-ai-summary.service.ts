import { Injectable } from '@nestjs/common';

import { ProjectAISummary } from './project-ai-summary.domain';
import { ProjectAISummaryMapper } from './project-ai-summary.mapper';
import { ProjectAISummaryRepo } from './project-ai-summary.repo';

@Injectable()
export class ProjectAISummaryService {
  constructor(private repo: ProjectAISummaryRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(projectAISummary: ProjectAISummary) {
    this._validate(projectAISummary);

    if (!projectAISummary.isPersist) {
      await this.repo.create(projectAISummary);
    } else {
      await this.repo.update(projectAISummary.id, projectAISummary);
    }

    projectAISummary.setPgState(ProjectAISummaryMapper.toPg);
  }

  async saveBulk(projectAISummaries: ProjectAISummary[]) {
    return Promise.all(projectAISummaries.map((p) => this.save(p)));
  }

  async delete(id: string) {
    return this.repo.delete(id);
  }

  private _validate(_projectAISummary: ProjectAISummary) {
    // validation rules can be added here
  }
}
