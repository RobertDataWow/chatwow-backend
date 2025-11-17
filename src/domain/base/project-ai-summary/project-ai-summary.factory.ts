import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { isDefined } from '@shared/common/common.validator';

import { ProjectAISummaryMapper } from './project-ai-summary.mapper';
import type { ProjectAISummaryPlain } from './types/project-ai-summary.domain.type';

export class ProjectAISummaryFactory {
  static mock(data: Partial<ProjectAISummaryPlain>) {
    return ProjectAISummaryMapper.fromPlain({
      id: isDefined(data.id) ? data.id : uuidV7(),
      createdAt: isDefined(data.createdAt)
        ? data.createdAt
        : myDayjs().toDate(),
      aiSummaryMd: isDefined(data.aiSummaryMd) ? data.aiSummaryMd : '',
    });
  }

  static mockBulk(amount: number, data: Partial<ProjectAISummaryPlain>) {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
