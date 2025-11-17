import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import { CommentMapper } from './comment.mapper';
import type {
  CommentNewData,
  CommentPg,
  CommentPlain,
  CommentUpdateData,
} from './types/comment.domain.type';

export class Comment extends DomainEntity<CommentPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly comment: string;
  readonly postId: string;
  readonly createdById: string;

  constructor(plain: CommentPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: CommentNewData) {
    return CommentMapper.fromPlain({
      id: uuidV7(),
      createdAt: myDayjs().toDate(),
      comment: data.comment,
      postId: data.postId,
      createdById: data.createdById,
    });
  }
  static newBulk(data: CommentNewData[]) {
    return data.map((d) => Comment.new(d));
  }

  edit(data: CommentUpdateData) {
    const plain: CommentPlain = {
      id: this.id,
      createdAt: this.createdAt,
      createdById: this.createdById,

      // update able
      comment: isDefined(data.comment) ? data.comment : this.comment,
      postId: isDefined(data.postId) ? data.postId : this.postId,
    };

    Object.assign(this, plain);
  }
}
