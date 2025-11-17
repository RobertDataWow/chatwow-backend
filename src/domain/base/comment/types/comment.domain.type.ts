import type { OverrideProperties } from 'type-fest';

import type { Comments } from '@infra/db/db';
import type { DBModel } from '@infra/db/db.common';

import type { Plain } from '@shared/common/common.type';

import type { Comment } from '../comment.domain';

export type CommentPg = DBModel<Comments>;
export type CommentPlain = Plain<Comment>;

export type CommentJson = OverrideProperties<
  CommentPlain,
  {
    createdAt: string;
  }
>;

export type CommentNewData = {
  comment: string;
  postId: string;
  createdById: string;
};
export type CommentUpdateData = {
  comment?: string;
  postId?: string;
};
