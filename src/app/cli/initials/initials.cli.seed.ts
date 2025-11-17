import { Comment } from '@domain/base/comment/comment.domain';
import { CommentService } from '@domain/base/comment/comment.service';
import { Post } from '@domain/base/post/post.domain';
import { PostService } from '@domain/base/post/post.service';
import { User } from '@domain/base/user/user.domain';
import { UserService } from '@domain/base/user/user.service';
import { Command, CommandRunner } from 'nest-commander';

import { TransactionService } from '@infra/global/transaction/transaction.service';

@Command({
  name: 'initials:seed',
  description: 'Create record in initials table',
})
export class InitialsCliSeed extends CommandRunner {
  constructor(
    private transactionService: TransactionService,

    private userService: UserService,
    private postService: PostService,
    private commentService: CommentService,
  ) {
    super();
  }

  async run(_passedParams: string[]): Promise<void> {
    try {
      await this.transactionService.transaction(async () => this._initAll());
    } catch (error) {
      console.log('==================================');
      console.log(error);
      console.log('==================================');
    }
  }

  private async _initAll(): Promise<void> {
    const superAdmin = User.new({
      email: 'superadmin@example.com',
      password: 'password',
      status: 'ACTIVE',
    });

    const general = User.new({
      email: 'general@example.com',
      password: 'password',
      status: 'ACTIVE',
    });

    const posts = Post.newBulk([
      {
        createdById: general.id,
        title: 'FIRST POST!',
        details: 'this is my first post',
      },
      {
        createdById: general.id,
        title: 'SECOND POST!',
        details: 'i like chocolate',
      },
    ]);

    const comments = Comment.newBulk([
      {
        comment: 'good job',
        postId: posts[0].id,
        createdById: superAdmin.id,
      },
      {
        comment: 'well done',
        postId: posts[1].id,
        createdById: superAdmin.id,
      },
    ]);

    await this.userService.saveBulk([superAdmin, general]);
    await this.postService.saveBulk(posts);
    await this.commentService.saveBulk(comments);
  }
}
