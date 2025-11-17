import type { CommentResponse } from '@domain/base/comment/comment.response';
import type { PostResponse } from '@domain/base/post/post.response';
import type { UserResponse } from '@domain/base/user/user.response';
import z from 'zod';

import type { PaginationMetaResponse } from '@shared/http/http.response.dto';
import { StandardResponse } from '@shared/http/http.response.dto';
import {
  getIncludesZod,
  getPaginationZod,
  getSortZod,
  zodDto,
} from '@shared/zod/zod.util';

import { commonUserFilter, commonUserSort } from '../users.v1.common';

const zod = z.object({
  includes: getIncludesZod(['posts', 'posts:comments']),
  sort: getSortZod(commonUserSort),
  pagination: getPaginationZod(),
  filter: z.object(commonUserFilter).optional(),
});

export class GetUserDto extends zodDto(zod) {}

// Response

class CommentData {
  attributes: CommentResponse;
}

class CommentRelations {
  comments: CommentData[];
}

class PostsData {
  attributes: PostResponse;
  relations?: CommentRelations;
}

class PostsRelations {
  posts: PostsData[];
}

class UserData {
  attributes: UserResponse;
  relations?: PostsRelations;
}

export class GetUserData {
  users: UserData[];
}

export class GetUserResponse extends StandardResponse {
  data: GetUserData;
  meta: PaginationMetaResponse;
}
