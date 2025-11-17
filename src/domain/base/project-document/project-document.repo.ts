import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { ProjectDocument } from './project-document.domain';
import { ProjectDocumentMapper } from './project-document.mapper';

@Injectable()
export class ProjectDocumentRepo extends BaseRepo {
  async create(projectDocument: ProjectDocument): Promise<void> {
    await this.db
      //
      .insertInto('project_documents')
      .values(ProjectDocumentMapper.toPg(projectDocument))
      .execute();
  }

  async update(id: string, projectDocument: ProjectDocument): Promise<void> {
    const data = diff(
      projectDocument.pgState,
      ProjectDocumentMapper.toPg(projectDocument),
    );
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('project_documents')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<ProjectDocument | null> {
    const projectDocumentPg = await this.readDb
      .selectFrom('project_documents')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!projectDocumentPg) {
      return null;
    }

    const projectDocument =
      ProjectDocumentMapper.fromPgWithState(projectDocumentPg);
    return projectDocument;
  }

  async delete(id: string): Promise<void> {
    await this.db
      //
      .deleteFrom('project_documents')
      .where('id', '=', id)
      .execute();
  }
}
