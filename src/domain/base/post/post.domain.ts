import { uuidV7 } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';
import { isDefined } from '@shared/common/common.validator';

import { PostMapper } from './post.mapper';
import type {
  PostNewData,
  PostPg,
  PostPlain,
  PostUpdateData,
} from './types/post.domain.type';

export class Post extends DomainEntity<PostPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly title: string;
  readonly details: string;
  readonly createdById: string;

  constructor(plain: PostPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: PostNewData) {
    return PostMapper.fromPlain({
      id: uuidV7(),
      createdAt: myDayjs().toDate(),
      updatedAt: myDayjs().toDate(),
      title: data.title,
      details: data.details || '',
      createdById: data.createdById,
    });
  }
  static newBulk(data: PostNewData[]) {
    return data.map((d) => Post.new(d));
  }

  edit(data: PostUpdateData) {
    const plain: PostPlain = {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: myDayjs().toDate(),
      createdById: this.createdById,

      // update able
      title: isDefined(data.title) ? data.title : this.title,
      details: isDefined(data.details) ? data.details : this.details,
    };

    Object.assign(this, plain);
  }
}
