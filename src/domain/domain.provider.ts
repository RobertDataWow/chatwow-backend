import { CommentModule } from './base/comment/comment.module';
import { PostModule } from './base/post/post.module';
import { UserModule } from './base/user/user.module';
import { AuthModule } from './orchestration/auth/auth.module';
import { QueueModule } from './orchestration/queue/queue.module';

export const DOMAIN_PROVIDER = [
  //
  UserModule,
  PostModule,
  CommentModule,

  //
  AuthModule,
  QueueModule,
];
