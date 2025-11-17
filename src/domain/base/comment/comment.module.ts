import { Module } from '@nestjs/common';

import { CommentRepo } from './comment.repo';
import { CommentService } from './comment.service';

@Module({
  providers: [CommentRepo, CommentService],
  exports: [CommentService],
})
export class CommentModule {}
