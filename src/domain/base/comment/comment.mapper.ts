import {
  toDate,
  toISO,
  toResponseDate,
} from '@shared/common/common.transformer';
import type { WithPgState } from '@shared/common/common.type';

import { Comment } from './comment.domain';
import type { CommentResponse } from './comment.response';
import type {
  CommentJson,
  CommentPg,
  CommentPlain,
} from './types/comment.domain.type';

export class CommentMapper {
  static fromPg(pg: CommentPg): Comment {
    const plain: CommentPlain = {
      id: pg.id,
      createdAt: toDate(pg.created_at),
      comment: pg.comment,
      postId: pg.post_id,
      createdById: pg.created_by_id,
    };

    return new Comment(plain);
  }

  static fromPgWithState(pg: CommentPg): Comment {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: CommentPlain): Comment {
    const plain: CommentPlain = {
      id: plainData.id,
      createdAt: plainData.createdAt,
      comment: plainData.comment,
      postId: plainData.postId,
      createdById: plainData.createdById,
    };

    return new Comment(plain);
  }

  static fromJson(json: CommentJson): Comment {
    const plain: CommentPlain = {
      id: json.id,
      createdAt: toDate(json.createdAt),
      comment: json.comment,
      postId: json.postId,
      createdById: json.createdById,
    };

    return new Comment(plain);
  }

  static toPg(comment: Comment): CommentPg {
    return {
      id: comment.id,
      created_at: comment.createdAt.toISOString(),
      comment: comment.comment,
      post_id: comment.postId,
      created_by_id: comment.createdById,
    };
  }

  static toPlain(comment: Comment): CommentPlain {
    return {
      id: comment.id,
      createdAt: comment.createdAt,
      comment: comment.comment,
      postId: comment.postId,
      createdById: comment.createdById,
    };
  }

  static toResponse(comment: Comment): CommentResponse {
    return {
      id: comment.id,
      createdAt: toResponseDate(comment.createdAt),
      comment: comment.comment,
    };
  }

  static pgToResponse(comment: CommentPg): CommentResponse {
    return {
      id: comment.id,
      createdAt: toResponseDate(comment.created_at),
      comment: comment.comment,
    };
  }

  static toJson(comment: Comment): CommentJson {
    return {
      id: comment.id,
      createdAt: toISO(comment.createdAt),
      comment: comment.comment,
      postId: comment.postId,
      createdById: comment.createdById,
    };
  }

  static toJsonWithState(
    comment: Comment,
  ): WithPgState<CommentJson, CommentPg> {
    return {
      state: comment.pgState,
      data: CommentMapper.toJson(comment),
    };
  }
}
