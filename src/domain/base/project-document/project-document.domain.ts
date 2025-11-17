import { uuidV7 } from '@shared/common/common.crypto';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import type {
  ProjectDocumentNewData,
  ProjectDocumentPg,
  ProjectDocumentPlain,
  ProjectDocumentUpdateData,
} from './types/project-document.domain.type';

export class ProjectDocument extends DomainEntity<ProjectDocumentPg> {
  readonly id: string;
  readonly documentStatus: 'ACTIVE' | 'INACTIVE';
  readonly aiSummaryMd: string;

  constructor(plain: ProjectDocumentPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: ProjectDocumentNewData) {
    return {
      id: uuidV7(),
      documentStatus: data.documentStatus,
      aiSummaryMd: data.aiSummaryMd || '',
    } as ProjectDocumentPlain;
  }

  static newBulk(data: ProjectDocumentNewData[]) {
    return data.map((d) => {
      const plain: ProjectDocumentPlain = ProjectDocument.new(d);
      return new ProjectDocument(plain);
    });
  }

  edit(data: ProjectDocumentUpdateData) {
    const plain: ProjectDocumentPlain = {
      id: this.id,
      documentStatus: isDefined(data.documentStatus)
        ? data.documentStatus
        : this.documentStatus,
      aiSummaryMd: isDefined(data.aiSummaryMd)
        ? data.aiSummaryMd
        : this.aiSummaryMd,
    };

    Object.assign(this, plain);
  }
}
