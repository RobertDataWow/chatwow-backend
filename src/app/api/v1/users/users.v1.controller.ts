import {
  Body,
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Patch,
  Query,
} from '@nestjs/common';

import { GetUserDto, GetUserResponse } from './get-users/get-users.dto';
import { GetUsersQuery } from './get-users/get-users.query';
import { UpdateUserCommand } from './update-user/update-user.command';
import {
  UpdateUserDto,
  UpdateUserResponse,
} from './update-user/update-user.dto';

@Controller({
  path: 'users',
  version: '1',
})
export class UsersV1Controller {
  constructor(
    private getUsersQuery: GetUsersQuery,
    private updateUserCommand: UpdateUserCommand,
  ) {}

  @Get()
  async getUser(@Query() query: GetUserDto): Promise<GetUserResponse> {
    return this.getUsersQuery.exec(query);
  }

  @Patch(':id')
  async updateUser(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() body: UpdateUserDto,
  ): Promise<UpdateUserResponse> {
    return this.updateUserCommand.exec(id, body);
  }
}
