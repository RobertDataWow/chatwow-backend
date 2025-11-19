import { Body, Controller, Post } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';

import { AddUserCommand } from './add-user/add-user.command';
import { AddUserDto, AddUserResponse } from './add-user/add-user.dto';

@Controller({ path: 'users', version: '1' })
export class UsersV1Controller {
  constructor(
    //
    private addUserCommand: AddUserCommand,
  ) {}

  @Post()
  @ApiResponse({ type: () => AddUserResponse })
  async addUser(@Body() body: AddUserDto): Promise<AddUserResponse> {
    return this.addUserCommand.exec(body);
  }
}
