import { Module } from '@nestjs/common';

import { GetUsersQuery } from './get-users/get-users.query';
import { UpdateUserCommand } from './update-user/update-user.command';
import { UsersV1Controller } from './users.v1.controller';

@Module({
  providers: [GetUsersQuery, UpdateUserCommand],
  controllers: [UsersV1Controller],
})
export class UsersV1Module {}
