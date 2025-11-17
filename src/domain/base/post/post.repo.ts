import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { Post } from './post.domain';
import { PostMapper } from './post.mapper';

@Injectable()
export class PostRepo extends BaseRepo {
  async create(post: Post): Promise<void> {
    await this.db
      //
      .insertInto('posts')
      .values(PostMapper.toPg(post))
      .execute();
  }

  async update(id: string, post: Post): Promise<void> {
    const data = diff(post.pgState, PostMapper.toPg(post));
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('posts')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<Post | null> {
    const postPg = await this.readDb
      .selectFrom('posts')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!postPg) {
      return null;
    }

    const post = PostMapper.fromPgWithState(postPg);

    return post;
  }
}
