import type { OverrideProperties } from 'type-fest';

import type { Posts } from '@infra/db/db';
import type { DBModel } from '@infra/db/db.common';

import type { Plain } from '@shared/common/common.type';

import type { Post } from '../post.domain';

export type PostPg = DBModel<Posts>;
export type PostPlain = Plain<Post>;

export type PostJson = OverrideProperties<
  PostPlain,
  {
    createdAt: string;
    updatedAt: string;
  }
>;

export type PostNewData = {
  title: string;
  createdById: string;
  details: string;
};
export type PostUpdateData = {
  title?: string;
  details?: string;
};
