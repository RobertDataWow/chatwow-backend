import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { isDefined } from '@shared/common/common.validator';

import { PostMapper } from './post.mapper';
import type { PostPlain } from './types/post.domain.type';

export class PostFactory {
  static mock(data: Partial<PostPlain>) {
    return PostMapper.fromPlain({
      id: isDefined(data.id) ? data.id : uuidV7(),
      createdAt: isDefined(data.createdAt)
        ? data.createdAt
        : myDayjs().toDate(),
      updatedAt: isDefined(data.updatedAt)
        ? data.updatedAt
        : myDayjs().toDate(),
      title: isDefined(data.title) ? data.title : 'Sample title',
      details: isDefined(data.details) ? data.details : 'Sample details',
      createdById: isDefined(data.createdById) ? data.createdById : uuidV7(),
    });
  }

  static mockBulk(amount: number, data: Partial<PostPlain>) {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
