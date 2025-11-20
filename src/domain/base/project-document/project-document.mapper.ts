import { toDate, toISO } from '@shared/common/common.transformer';

import { ProjectDocument } from './project-document.domain';
import type { ProjectDocumentResponse } from './project-document.response';
import type {
  ProjectDocumentJson,
  ProjectDocumentPg,
  ProjectDocumentPlain,
} from './types/project-document.domain.type';

export class ProjectDocumentMapper {
  static fromPg(pg: ProjectDocumentPg): ProjectDocument {
    const plain: ProjectDocumentPlain = {
      id: pg.id,
      createdAt: toDate(pg.created_at),
      projectId: pg.project_id,
      documentStatus: pg.document_status,
      documentDetails: pg.document_details,
      aiSummaryMd: pg.ai_summary_md,
    };

    return new ProjectDocument(plain);
  }

  static fromPgWithState(pg: ProjectDocumentPg): ProjectDocument {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: ProjectDocumentPlain): ProjectDocument {
    const plain: ProjectDocumentPlain = {
      id: plainData.id,
      createdAt: plainData.createdAt,
      projectId: plainData.projectId,
      documentDetails: plainData.documentDetails,
      documentStatus: plainData.documentStatus,
      aiSummaryMd: plainData.aiSummaryMd,
    };

    return new ProjectDocument(plain);
  }

  static fromJson(json: ProjectDocumentJson): ProjectDocument {
    const plain: ProjectDocumentPlain = {
      id: json.id,
      createdAt: toDate(json.createdAt),
      projectId: json.projectId,
      documentStatus: json.documentStatus,
      documentDetails: json.documentDetails,
      aiSummaryMd: json.aiSummaryMd,
    };

    return new ProjectDocument(plain);
  }

  static toPg(projectDocument: ProjectDocument): ProjectDocumentPg {
    return {
      id: projectDocument.id,
      created_at: toISO(projectDocument.createdAt),
      project_id: projectDocument.projectId,
      document_status: projectDocument.documentStatus,
      ai_summary_md: projectDocument.aiSummaryMd,
      document_details: projectDocument.documentDetails,
    };
  }

  static toPlain(projectDocument: ProjectDocument): ProjectDocumentPlain {
    return {
      id: projectDocument.id,
      createdAt: projectDocument.createdAt,
      projectId: projectDocument.projectId,
      documentStatus: projectDocument.documentStatus,
      aiSummaryMd: projectDocument.aiSummaryMd,
      documentDetails: projectDocument.documentDetails,
    };
  }

  static toJson(projectDocument: ProjectDocument): ProjectDocumentJson {
    return {
      id: projectDocument.id,
      createdAt: toISO(projectDocument.createdAt),
      projectId: projectDocument.projectId,
      documentStatus: projectDocument.documentStatus,
      aiSummaryMd: projectDocument.aiSummaryMd,
      documentDetails: projectDocument.documentDetails,
    };
  }

  static toResponse(projectDocument: ProjectDocument): ProjectDocumentResponse {
    return {
      id: projectDocument.id,
      createdAt: toISO(projectDocument.createdAt),
      documentStatus: projectDocument.documentStatus,
      documentDetails: projectDocument.documentDetails,
      aiSummaryMd: projectDocument.aiSummaryMd,
    };
  }

  static pgToResponse(pg: ProjectDocumentPg): ProjectDocumentResponse {
    return {
      id: pg.id,
      createdAt: toISO(pg.created_at),
      documentStatus: pg.document_status,
      documentDetails: pg.document_details,
      aiSummaryMd: pg.ai_summary_md,
    };
  }
}
