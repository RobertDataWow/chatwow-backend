import {
  toDate,
  toISO,
  toResponseDate,
} from '@shared/common/common.transformer';
import type { WithPgState } from '@shared/common/common.type';

import { Post } from './post.domain';
import type { PostResponse } from './post.response';
import type { PostJson, PostPg, PostPlain } from './types/post.domain.type';

export class PostMapper {
  static fromPg(pg: PostPg): Post {
    const plain: PostPlain = {
      id: pg.id,
      createdAt: toDate(pg.created_at),
      updatedAt: toDate(pg.updated_at),
      title: pg.title,
      details: pg.details,
      createdById: pg.created_by_id,
    };

    return new Post(plain);
  }

  static fromPgWithState(pg: PostPg): Post {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: PostPlain): Post {
    const plain: PostPlain = {
      id: plainData.id,
      createdAt: plainData.createdAt,
      updatedAt: plainData.updatedAt,
      title: plainData.title,
      details: plainData.details,
      createdById: plainData.createdById,
    };

    return new Post(plain);
  }

  static fromJson(json: PostJson): Post {
    const plain: PostPlain = {
      id: json.id,
      createdAt: toDate(json.createdAt),
      updatedAt: toDate(json.updatedAt),
      title: json.title,
      details: json.details,
      createdById: json.createdById,
    };

    return new Post(plain);
  }

  static toPg(post: Post): PostPg {
    return {
      id: post.id,
      created_at: post.createdAt.toISOString(),
      updated_at: post.updatedAt.toISOString(),
      title: post.title,
      details: post.details,
      created_by_id: post.createdById,
    };
  }

  static toPlain(post: Post): PostPlain {
    return {
      id: post.id,
      createdAt: post.createdAt,
      updatedAt: post.updatedAt,
      title: post.title,
      details: post.details,
      createdById: post.createdById,
    };
  }

  static toResponse(post: Post): PostResponse {
    return {
      id: post.id,
      createdAt: toResponseDate(post.createdAt),
      updatedAt: toResponseDate(post.updatedAt),
      title: post.title,
      details: post.details,
    };
  }

  static pgToResponse(post: PostPg): PostResponse {
    return {
      id: post.id,
      createdAt: toResponseDate(post.created_at),
      updatedAt: toResponseDate(post.updated_at),
      title: post.title,
      details: post.details,
    };
  }

  static toJson(post: Post): PostJson {
    return {
      id: post.id,
      createdAt: toISO(post.createdAt),
      updatedAt: toISO(post.updatedAt),
      title: post.title,
      details: post.details,
      createdById: post.createdById,
    };
  }

  static toJsonWithState(post: Post): WithPgState<PostJson, PostPg> {
    return {
      state: post.pgState,
      data: PostMapper.toJson(post),
    };
  }
}
