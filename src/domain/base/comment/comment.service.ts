import { Injectable } from '@nestjs/common';

import { Comment } from './comment.domain';
import { CommentMapper } from './comment.mapper';
import { CommentRepo } from './comment.repo';

@Injectable()
export class CommentService {
  constructor(private repo: CommentRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(comment: Comment) {
    this._validate(comment);

    if (!comment.isPersist) {
      await this.repo.create(comment);
    } else {
      await this.repo.update(comment.id, comment);
    }

    comment.setPgState(CommentMapper.toPg);
  }

  async saveBulk(comments: Comment[]) {
    return Promise.all(comments.map((c) => this.save(c)));
  }

  private _validate(_comment: Comment) {
    // no rule for now
  }
}
