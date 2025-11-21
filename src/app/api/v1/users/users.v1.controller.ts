import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { UserClaims } from '@infra/middleware/jwt/jwt.common';

import { AddUserCommand } from './add-user/add-user.command';
import { AddUserDto, AddUserResponse } from './add-user/add-user.dto';
import { EditUserCommand } from './edit-user/edit-user.command';
import { EditUserDto, EditUserResponse } from './edit-user/edit-user.dto';
import { GetUserDto, GetUserResponse } from './get-user/get-user.dto';
import { GetUserQuery } from './get-user/get-user.query';
import { ListUsersDto, ListUsersResponse } from './list-users/list-users.dto';
import { ListUsersQuery } from './list-users/list-users.query';
import { ResendInviteCommand } from './resend-invite/resend-invite.command';
import { ResendInviteResponse } from './resend-invite/resend-invite.dto';

@Controller({ path: 'users', version: '1' })
export class UsersV1Controller {
  constructor(
    //
    private addUserCommand: AddUserCommand,
    private editUserCommand: EditUserCommand,
    private listUsersQuery: ListUsersQuery,
    private getUserQuery: GetUserQuery,
    private resendInviteCommand: ResendInviteCommand,
  ) {}

  @Get()
  @ApiResponse({ type: () => ListUsersResponse })
  async getUsers(@Query() query: ListUsersDto) {
    return this.listUsersQuery.exec(query);
  }

  @Post()
  @ApiResponse({ type: () => AddUserResponse })
  async addUser(@Body() body: AddUserDto): Promise<AddUserResponse> {
    return this.addUserCommand.exec(body);
  }

  @Get('me')
  @ApiResponse({ type: () => GetUserResponse })
  async getSelf(
    @UserClaims() claims: UserClaims,
    @Query() query: GetUserDto,
  ): Promise<GetUserResponse> {
    return this.getUserQuery.exec(claims.id, query);
  }

  @Get(':id')
  @ApiResponse({ type: () => GetUserResponse })
  async getUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Query() query: GetUserDto,
  ): Promise<GetUserResponse> {
    return this.getUserQuery.exec(id, query);
  }

  @Patch(':id')
  @ApiResponse({ type: () => EditUserResponse })
  async editUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: EditUserDto,
  ): Promise<EditUserResponse> {
    return this.editUserCommand.exec(id, body);
  }

  @Post(':id/resend-invite')
  @ApiResponse({ type: () => ResendInviteResponse })
  async resendInvite(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<ResendInviteResponse> {
    return this.resendInviteCommand.exec(id);
  }
}
