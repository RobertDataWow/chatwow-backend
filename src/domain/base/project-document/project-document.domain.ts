import type { DocumentStatus } from '@infra/db/db';

import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import { ProjectDocumentMapper } from './project-document.mapper';
import type {
  ProjectDocumentNewData,
  ProjectDocumentPg,
  ProjectDocumentPlain,
  ProjectDocumentUpdateData,
} from './types/project-document.domain.type';

export class ProjectDocument extends DomainEntity<ProjectDocumentPg> {
  readonly id: string;
  readonly documentStatus: DocumentStatus;
  readonly documentDetails: string;
  readonly aiSummaryMd: string;
  readonly projectId: string;
  readonly createdAt: Date;

  constructor(plain: ProjectDocumentPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: ProjectDocumentNewData) {
    return ProjectDocumentMapper.fromPlain({
      id: uuidV7(),
      createdAt: myDayjs().toDate(),
      projectId: data.projectId,
      documentDetails: data.documentDetails || '',
      documentStatus: data.documentStatus || 'ACTIVE',
      aiSummaryMd: data.aiSummaryMd || '',
    });
  }

  static newBulk(data: ProjectDocumentNewData[]) {
    return data.map((d) => ProjectDocument.new(d));
  }

  edit(data: ProjectDocumentUpdateData) {
    const plain: ProjectDocumentPlain = {
      id: this.id,
      createdAt: this.createdAt,
      documentDetails: isDefined(data.documentDetails)
        ? data.documentDetails
        : this.documentDetails,
      documentStatus: isDefined(data.documentStatus)
        ? data.documentStatus
        : this.documentStatus,
      aiSummaryMd: isDefined(data.aiSummaryMd)
        ? data.aiSummaryMd
        : this.aiSummaryMd,
      projectId: isDefined(data.projectId) ? data.projectId : this.projectId,
    };

    Object.assign(this, plain);
  }
}
