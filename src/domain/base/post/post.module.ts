import { Module } from '@nestjs/common';

import { PostRepo } from './post.repo';
import { PostService } from './post.service';

@Module({
  providers: [PostRepo, PostService],
  exports: [PostService],
})
export class PostModule {}
