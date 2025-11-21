import { Module } from '@nestjs/common';

import { AddUserCommand } from './add-user/add-user.command';
import { EditUserCommand } from './edit-user/edit-user.command';
import { GetUserQuery } from './get-user/get-user.query';
import { ListUsersQuery } from './list-users/list-users.query';
import { ResendInviteCommand } from './resend-invite/resend-invite.command';
import { UsersV1Controller } from './users.v1.controller';

@Module({
  providers: [
    //
    AddUserCommand,
    GetUserQuery,
    ListUsersQuery,
    EditUserCommand,
    ResendInviteCommand,
  ],
  controllers: [UsersV1Controller],
})
export class UsersV1Module {}
