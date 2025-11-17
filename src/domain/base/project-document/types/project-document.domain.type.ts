import type { DBModel } from '@infra/db/db.common';
import type { ProjectDocuments } from '@infra/db/db.d';

import type { Plain } from '@shared/common/common.type';

import type { ProjectDocument } from '../project-document.domain';

export type ProjectDocumentPg = DBModel<ProjectDocuments>;
export type ProjectDocumentPlain = Plain<ProjectDocument>;

export type ProjectDocumentJson = ProjectDocumentPlain;

export type ProjectDocumentNewData = {
  documentStatus: 'ACTIVE' | 'INACTIVE';
  aiSummaryMd?: string;
};

export type ProjectDocumentUpdateData = {
  documentStatus?: 'ACTIVE' | 'INACTIVE';
  aiSummaryMd?: string;
};
