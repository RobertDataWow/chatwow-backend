import { Module } from '@nestjs/common';

import { AddUserCommand } from './add-user/add-user.command';
import { UsersV1Controller } from './users.v1.controller';

@Module({
  providers: [AddUserCommand],
  controllers: [UsersV1Controller],
})
export class UsersV1Module {}
