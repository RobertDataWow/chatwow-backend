import { ProjectDocument } from '@domain/base/project-document/project-document.domain';
import { ProjectDocumentMapper } from '@domain/base/project-document/project-document.mapper';
import { ProjectDocumentService } from '@domain/base/project-document/project-document.service';
import { Project } from '@domain/base/project/project.domain';
import { ProjectMapper } from '@domain/base/project/project.mapper';
import { ProjectService } from '@domain/base/project/project.service';
import { STORED_FILE_OWNER_TABLE } from '@domain/base/stored-file/stored-file.constant';
import { StoredFile } from '@domain/base/stored-file/stored-file.domain';
import { StoredFileMapper } from '@domain/base/stored-file/stored-file.mapper';
import { StoredFileService } from '@domain/base/stored-file/stored-file.service';
import { UserGroupProjectService } from '@domain/base/user-group-project/user-group-project.service';
import { UserGroup } from '@domain/base/user-group/user-group.domain';
import { UserGroupMapper } from '@domain/base/user-group/user-group.mapper';
import { UserGroupService } from '@domain/base/user-group/user-group.service';
import { Inject, Injectable } from '@nestjs/common';
import { jsonArrayFrom, jsonObjectFrom } from 'kysely/helpers/postgres';
import { differenceWith } from 'remeda';

import { READ_DB, ReadDB } from '@infra/db/db.common';
import { TransactionService } from '@infra/global/transaction/transaction.service';

import { CommandInterface } from '@shared/common/common.type';
import { ApiException } from '@shared/http/http.exception';

import { EditProjectDto, EditProjectResponse } from './edit-project.dto';

type Entity = {
  project: Project;
  userGroups: UserGroup[];
  projectDocumentsFiles: {
    storedFile: StoredFile | null;
    projectDocument: ProjectDocument;
  }[];
};

@Injectable()
export class EditProjectCommand implements CommandInterface {
  constructor(
    @Inject(READ_DB)
    private readDb: ReadDB,

    private projectService: ProjectService,
    private storedFileService: StoredFileService,
    private userGroupService: UserGroupService,
    private projectDocumentService: ProjectDocumentService,
    private userGroupProjectService: UserGroupProjectService,
    private transactionService: TransactionService,
  ) {}

  async exec(id: string, body: EditProjectDto): Promise<EditProjectResponse> {
    const entity = await this.find(id);

    if (body.project) {
      entity.project.edit(body.project);
    }

    if (body.userGroupIds) {
      const userGroupSet = new Set(body.userGroupIds);
      entity.userGroups.filter((ug) => userGroupSet.has(ug.id));
    }

    if (body.projectDocuments) {
      // Reset state to upsert
      const storeFileMapper = new Map(
        entity.projectDocumentsFiles.reduce(
          (acc, doc) => {
            if (doc.storedFile) {
              acc.push([doc.storedFile.id, doc.storedFile]);
            }

            return acc;
          },
          [] as [string, StoredFile][],
        ),
      );

      const newDocumentFiles: typeof entity.projectDocumentsFiles = [];
      for (const doc of body.projectDocuments) {
        const projectDocument = ProjectDocument.new({
          projectId: entity.project.id,
          documentStatus: 'ACTIVE',
          documentDetails: doc.documentDetails || '',
        });

        const currentStoreFile = storeFileMapper.get(doc.storedFile.id);

        let newStoreFile: StoredFile;
        if (currentStoreFile) {
          currentStoreFile.edit({
            ownerId: projectDocument.id,
            id: doc.storedFile.id,
            filename: doc.storedFile.filename,
          });
          newStoreFile = currentStoreFile;
        } else {
          newStoreFile = StoredFile.new({
            ...doc.storedFile,
            ownerTable: STORED_FILE_OWNER_TABLE.PROJECT_DOCUMENT,
            ownerId: projectDocument.id,
          });
        }

        newDocumentFiles.push({
          projectDocument,
          storedFile: newStoreFile,
        });
      }

      // delete current project doc
      await this.projectDocumentService.deleteBulk(
        entity.projectDocumentsFiles.map((doc) => doc.projectDocument.id),
      );

      const fileToDelete = differenceWith(
        Array.from(storeFileMapper.values()),
        newDocumentFiles,
        (storeFile, newData) => storeFile.id === newData.storedFile!.id,
      );
      await this.storedFileService.deleteRelatedBulk(fileToDelete);

      entity.projectDocumentsFiles = newDocumentFiles;
    }

    await this.save(entity);

    return {
      success: true,
      key: '',
      data: {
        project: {
          attributes: ProjectMapper.toResponse(entity.project),
          relations: {
            userGroups: entity.userGroups.map((g) => ({
              attributes: UserGroupMapper.toResponse(g),
            })),
            projectDocuments: entity.projectDocumentsFiles.map((pd) => ({
              attributes: ProjectDocumentMapper.toResponse(pd.projectDocument),
              relations: {
                storedFile: pd.storedFile
                  ? {
                      attributes: StoredFileMapper.toResponse(pd.storedFile),
                    }
                  : undefined,
              },
            })),
          },
        },
      },
    };
  }

  async save(entity: Entity): Promise<void> {
    await this.transactionService.transaction(async () => {
      await this.projectService.save(entity.project);

      if (entity.userGroups.length > 0) {
        await this.userGroupService.saveBulk(entity.userGroups);
        await this.userGroupProjectService.saveProjectRelations(
          entity.project.id,
          entity.userGroups.map((g) => g.id),
        );
      }

      await Promise.all(
        entity.projectDocumentsFiles.map(async (en) => {
          await this.projectDocumentService.save(en.projectDocument);

          if (en.storedFile) {
            await this.storedFileService.save(en.storedFile);
          }
        }),
      );
    });
  }

  async find(id: string): Promise<Entity> {
    const entity = await this.readDb
      .selectFrom('projects')
      .where('id', '=', id)
      .selectAll()
      .select((q) => [
        jsonArrayFrom(
          q
            .selectFrom('project_documents')
            .selectAll()
            .select((q) => [
              jsonObjectFrom(
                q
                  .selectFrom('stored_files')
                  .selectAll()
                  .whereRef('owner_id', '=', 'project_documents.id'),
              ).as('storedFile'),
            ])
            .whereRef('project_documents.project_id', '=', 'projects.id'),
        ).as('projectDocuments'),
        jsonArrayFrom(
          q
            .selectFrom('user_group_projects')
            .innerJoin(
              'user_groups',
              'user_groups.id',
              'user_group_projects.user_group_id',
            )
            .selectAll()
            .whereRef('user_group_projects.project_id', '=', 'projects.id'),
        ).as('userGroups'),
      ])
      .executeTakeFirst();

    if (!entity) {
      throw new ApiException(400, 'projectNotFound');
    }

    return {
      project: ProjectMapper.fromPgWithState(entity),
      userGroups: entity.userGroups.map((ug) =>
        UserGroupMapper.fromPgWithState(ug),
      ),
      projectDocumentsFiles: entity.projectDocuments.map((pd) => ({
        projectDocument: ProjectDocumentMapper.fromPgWithState(pd),
        storedFile: pd.storedFile
          ? StoredFileMapper.fromPgWithState(pd.storedFile)
          : null,
      })),
    };
  }
}
