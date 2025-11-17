import { Injectable } from '@nestjs/common';

import { Post } from './post.domain';
import { PostMapper } from './post.mapper';
import { PostRepo } from './post.repo';

@Injectable()
export class PostService {
  constructor(private repo: PostRepo) {}

  async findOne(id: string) {
    return this.repo.findOne(id);
  }

  async save(post: Post) {
    this._validate(post);

    if (!post.isPersist) {
      await this.repo.create(post);
    } else {
      await this.repo.update(post.id, post);
    }

    post.setPgState(PostMapper.toPg);
  }

  async saveBulk(posts: Post[]) {
    return Promise.all(posts.map((p) => this.save(p)));
  }

  private _validate(_post: Post) {
    // no rule for now
  }
}
