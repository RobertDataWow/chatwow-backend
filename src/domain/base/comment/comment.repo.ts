import { Injectable } from '@nestjs/common';

import { diff } from '@shared/common/common.func';
import { BaseRepo } from '@shared/common/common.repo';

import { Comment } from './comment.domain';
import { CommentMapper } from './comment.mapper';

@Injectable()
export class CommentRepo extends BaseRepo {
  async create(comment: Comment): Promise<void> {
    await this.db
      //
      .insertInto('comments')
      .values(CommentMapper.toPg(comment))
      .execute();
  }

  async update(id: string, comment: Comment): Promise<void> {
    const data = diff(comment.pgState, CommentMapper.toPg(comment));
    if (!data) {
      return;
    }

    await this.db
      //
      .updateTable('comments')
      .set(data)
      .where('id', '=', id)
      .execute();
  }

  async findOne(id: string): Promise<Comment | null> {
    const commentPg = await this.readDb
      .selectFrom('comments')
      .selectAll()
      .where('id', '=', id)
      .executeTakeFirst();

    if (!commentPg) {
      return null;
    }

    const comment = CommentMapper.fromPgWithState(commentPg);

    return comment;
  }
}
