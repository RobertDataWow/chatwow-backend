import { ProjectDocument } from '@domain/base/project-document/project-document.domain';
import { ProjectDocumentMapper } from '@domain/base/project-document/project-document.mapper';
import { ProjectDocumentService } from '@domain/base/project-document/project-document.service';
import { projectDocumentsTableFilter } from '@domain/base/project-document/project-document.util';
import { Project } from '@domain/base/project/project.domain';
import { ProjectMapper } from '@domain/base/project/project.mapper';
import { ProjectService } from '@domain/base/project/project.service';
import { Inject, Injectable } from '@nestjs/common';
import { jsonObjectFrom } from 'kysely/helpers/postgres';

import { READ_DB, ReadDB } from '@infra/db/db.common';

import { CommandInterface } from '@shared/common/common.type';
import { ApiException } from '@shared/http/http.exception';

import {
  EditProjectDocumentDto,
  EditProjectDocumentResponse,
} from './edit-project-document.dto';

type Entity = {
  projectDocument: ProjectDocument;
  project: Project;
};

@Injectable()
export class EditProjectDocumentCommand implements CommandInterface {
  constructor(
    @Inject(READ_DB)
    private readDb: ReadDB,

    private projectDocumentService: ProjectDocumentService,
    private projectService: ProjectService,
  ) {}

  async exec(
    id: string,
    body: EditProjectDocumentDto,
  ): Promise<EditProjectDocumentResponse> {
    const entity = await this.find(id);
    entity.projectDocument.edit(body.projectDocument);
    await this.save(entity);

    return {
      success: true,
      key: '',
      data: {
        projectDocument: {
          attributes: ProjectDocumentMapper.toResponse(entity.projectDocument),
          relations: {
            project: {
              attributes: ProjectMapper.toResponse(entity.project),
            },
          },
        },
      },
    };
  }

  async find(id: string): Promise<Entity> {
    const projectDocument = await this.readDb
      .selectFrom('project_documents')
      .selectAll()
      .select((q) =>
        jsonObjectFrom(
          q
            .selectFrom('projects')
            .selectAll()
            .whereRef('projects.id', '=', 'project_documents.project_id'),
        )
          .$notNull()
          .as('project'),
      )
      .where('id', '=', id)
      .where(projectDocumentsTableFilter)
      .executeTakeFirst();

    if (!projectDocument) {
      throw new ApiException(404, 'projectDocumentNotFound');
    }

    return {
      projectDocument: ProjectDocumentMapper.fromPgWithState(projectDocument),
      project: ProjectMapper.fromPgWithState(projectDocument.project),
    };
  }

  async save(entity: Entity): Promise<void> {
    await this.projectDocumentService.save(entity.projectDocument);
  }
}
