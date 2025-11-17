import { CommentMapper } from '@domain/base/comment/comment.mapper';
import { PostMapper } from '@domain/base/post/post.mapper';
import { UserMapper } from '@domain/base/user/user.mapper';
import { UserService } from '@domain/base/user/user.service';
import { Inject, Injectable } from '@nestjs/common';
import { jsonArrayFrom } from 'kysely/helpers/postgres';

import { READ_DB, ReadDB } from '@infra/db/db.common';
import { filterQbIds, queryCount } from '@infra/db/db.util';

import { getPagination } from '@shared/common/common.pagintaion';
import { QueryInterface } from '@shared/common/common.type';
import { HttpResponseMapper } from '@shared/http/http.mapper';

import { GetUserData, GetUserDto, GetUserResponse } from './get-users.dto';

@Injectable()
export class GetUsersQuery implements QueryInterface {
  constructor(
    @Inject(READ_DB)
    private db: ReadDB,
    private userService: UserService,
  ) {}

  async exec(query: GetUserDto): Promise<GetUserResponse> {
    const raw = await this.getRaw(query);

    const data: GetUserData = {
      users: raw.result.map((data) => ({
        attributes: UserMapper.pgToResponse(data),
        relations: data.posts && {
          posts: data.posts.map((post) => ({
            attributes: PostMapper.pgToResponse(post),
            relations: post.comments && {
              comments: post.comments.map((comment) => ({
                attributes: CommentMapper.pgToResponse(comment),
              })),
            },
          })),
        },
      })),
    };

    return HttpResponseMapper.toSuccess({
      data,
      meta: {
        pagination: getPagination(data.users, raw.totalCount, query.pagination),
      },
    });
  }

  async getRaw(query: GetUserDto) {
    const ids = await this.userService.findIds({
      filter: query.filter,
      pagination: query.pagination,
      sort: query.sort,
    });
    if (!ids) {
      return {
        result: [],
        totalCount: 0,
      };
    }

    const result = await this.db
      .selectFrom('users')
      .selectAll('users')
      .$if(query.includes.has('posts'), (q) =>
        q.select((eb) =>
          jsonArrayFrom(
            eb
              .selectFrom('posts')
              .selectAll('posts')
              .whereRef('posts.created_by_id', '=', 'users.id')
              .$if(query.includes.has('posts:comments'), (q) =>
                q.select((eb) =>
                  jsonArrayFrom(
                    eb
                      .selectFrom('comments')
                      .selectAll()
                      .whereRef('comments.post_id', '=', 'posts.id'),
                  ).as('comments'),
                ),
              ),
          ).as('posts'),
        ),
      )
      .$call((q) => filterQbIds(ids, q, 'users.id'))
      .execute();

    const totalCount = await this.db
      .selectFrom('users')
      .$call((q) => queryCount(q));

    return { result, totalCount };
  }
}
