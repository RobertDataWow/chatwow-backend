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
import { userGroupsTableFilter } from '@domain/base/user-group/user-group.utils';
import { Inject, Injectable } from '@nestjs/common';

import { READ_DB, ReadDB } from '@infra/db/db.common';
import { TransactionService } from '@infra/global/transaction/transaction.service';

import { CommandInterface } from '@shared/common/common.type';
import { ApiException } from '@shared/http/http.exception';

import { CreateProjectDto, CreateProjectResponse } from './create-project.dto';

type Entity = {
  project: Project;
  storedFiles: StoredFile[];
  userGroups: UserGroup[];
  projectDocuments: ProjectDocument[];
};

@Injectable()
export class CreateProjectCommand implements CommandInterface {
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

  async exec(body: CreateProjectDto): Promise<CreateProjectResponse> {
    const project = Project.new({
      ...body.project,
      projectStatus: 'ACTIVE',
    });
    const userGroups = await this.getUserGroups(body.userGroupIds);

    const projectDocuments: ProjectDocument[] = [];
    const storedFiles: StoredFile[] = [];
    for (const sf of body.storedFiles) {
      const projectDocument = ProjectDocument.new({
        projectId: project.id,
        documentStatus: 'ACTIVE',
      });
      projectDocuments.push(projectDocument);

      const storedFile = StoredFile.new({
        ...sf,
        ownerTable: STORED_FILE_OWNER_TABLE.PROJECT_DOCUMENT,
        ownerId: projectDocument.id,
      });
      storedFiles.push(storedFile);
    }

    await this.save({
      project,
      storedFiles,
      userGroups,
      projectDocuments,
    });

    return {
      success: true,
      key: '',
      data: {
        project: {
          attributes: ProjectMapper.toResponse(project),
          relations: {
            userGroups: userGroups.map((g) => ({
              attributes: UserGroupMapper.toResponse(g),
            })),
            projectDocuments: projectDocuments.map((pd) => ({
              attributes: ProjectDocumentMapper.toResponse(pd),
              relations: {
                storedFiles: storedFiles.map((sf) => ({
                  attributes: StoredFileMapper.toResponse(sf),
                })),
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

      await this.projectDocumentService.saveBulk(entity.projectDocuments);
      await this.storedFileService.saveBulk(entity.storedFiles);
    });
  }

  async getUserGroups(userGroupIds: string[]): Promise<UserGroup[]> {
    const rawRes = await this.readDb
      .selectFrom('user_groups')
      .where('id', 'in', userGroupIds)
      .where(userGroupsTableFilter)
      .selectAll()
      .execute();

    if (rawRes.length !== userGroupIds.length) {
      throw new ApiException(400, 'userGroupsNotFound');
    }

    return rawRes.map((r) => UserGroupMapper.fromPgWithState(r));
  }
}
