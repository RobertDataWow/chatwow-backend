import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { isDefined } from '@shared/common/common.validator';

import { CommentMapper } from './comment.mapper';
import type { CommentPlain } from './types/comment.domain.type';

export class CommentFactory {
  static mock(data: Partial<CommentPlain>) {
    return CommentMapper.fromPlain({
      id: isDefined(data.id) ? data.id : uuidV7(),
      createdAt: isDefined(data.createdAt)
        ? data.createdAt
        : myDayjs().toDate(),
      comment: isDefined(data.comment) ? data.comment : 'Sample comment',
      postId: isDefined(data.postId) ? data.postId : uuidV7(),
      createdById: isDefined(data.createdById) ? data.createdById : uuidV7(),
    });
  }

  static mockBulk(amount: number, data: Partial<CommentPlain>) {
    return Array(amount)
      .fill(0)
      .map(() => this.mock(data));
  }
}
