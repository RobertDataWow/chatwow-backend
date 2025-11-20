import { ProjectDocumentResponse } from '@domain/base/project-document/project-document.response';
import { PROJECT_STATUS } from '@domain/base/project/project.constant';
import { ProjectResponse } from '@domain/base/project/project.response';
import { StoredFileResponse } from '@domain/base/stored-file/stored-file.response';
import { createStoredFileZod } from '@domain/base/stored-file/stored-file.zod';
import { UserGroupResponse } from '@domain/base/user-group/user-group.response';
import { ApiProperty } from '@nestjs/swagger';
import z from 'zod';

import { IDomainData } from '@shared/common/common.type';
import { StandardResponse } from '@shared/http/http.response.dto';
import { zodDto } from '@shared/zod/zod.util';

// ================ Request ================

const zod = z.object({
  project: z
    .object({
      projectName: z.string().optional(),
      projectDescription: z.string().optional(),
      aiSummaryMd: z.string().optional(),
      projectStatus: z.enum(PROJECT_STATUS).optional(),
    })
    .optional(),
  projectDocuments: z
    .array(
      z.object({
        documentDetails: z.string(),
        storedFile: createStoredFileZod,
      }),
    )
    .optional(),
  userGroupIds: z.array(z.string()).optional(),
});

export class EditProjectDto extends zodDto(zod) {}

// ================ Response ================

class EditProjectProjectUserGroup implements IDomainData {
  @ApiProperty({ type: () => UserGroupResponse })
  attributes: UserGroupResponse;
}

class EditProjectProjectDocumentStoredFiles implements IDomainData {
  @ApiProperty({ type: () => StoredFileResponse })
  attributes: StoredFileResponse;
}

class EditProjectProjectProjectDocumentRelations {
  @ApiProperty({
    type: () => EditProjectProjectDocumentStoredFiles,
  })
  storedFile?: EditProjectProjectDocumentStoredFiles;
}

class EditProjectProjectProjectDocument implements IDomainData {
  @ApiProperty({ type: () => ProjectDocumentResponse })
  attributes: ProjectDocumentResponse;

  @ApiProperty({ type: () => EditProjectProjectProjectDocumentRelations })
  relations?: EditProjectProjectProjectDocumentRelations;
}

class EditProjectProjectRelations {
  @ApiProperty({ type: () => EditProjectProjectUserGroup, isArray: true })
  userGroups?: EditProjectProjectUserGroup[];

  @ApiProperty({
    type: () => EditProjectProjectProjectDocument,
    isArray: true,
  })
  projectDocuments?: EditProjectProjectProjectDocument[];
}

class EditProjectProject implements IDomainData {
  @ApiProperty({ type: () => ProjectResponse })
  attributes: ProjectResponse;

  @ApiProperty({ type: () => EditProjectProjectRelations })
  relations?: EditProjectProjectRelations;
}

export class EditProjectData {
  @ApiProperty({ type: () => EditProjectProject })
  project: EditProjectProject;
}

export class EditProjectResponse extends StandardResponse {
  @ApiProperty({ type: () => EditProjectData })
  data: EditProjectData;
}
