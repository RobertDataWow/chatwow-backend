import type { DBModel } from '@infra/db/db.common';
import type { ProjectAiSummaries } from '@infra/db/db.d';

import type { Plain } from '@shared/common/common.type';

import type { ProjectAISummary } from '../project-ai-summary.domain';

export type ProjectAISummaryPg = DBModel<ProjectAiSummaries>;
export type ProjectAISummaryPlain = Plain<ProjectAISummary>;

export type ProjectAISummaryJson = ProjectAISummaryPlain;

export type ProjectAISummaryNewData = {
  aiSummaryMd?: string;
};

export type ProjectAISummaryUpdateData = {
  aiSummaryMd?: string;
};
