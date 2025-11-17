import { Body, Controller, Post } from '@nestjs/common';

import { UsePublic } from '@infra/middleware/jwt/jwt.common';

import { SignInCommand } from './sign-in/sign-in.command';
import { SignInDto, SignInResponse } from './sign-in/sign-in.dto';
import { SignUpCommand } from './sign-up/sign-up.command';
import { SignUpResponse, SignupDto } from './sign-up/sign-up.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthV1Controller {
  constructor(
    private signInCommand: SignInCommand,
    private signUpCommand: SignUpCommand,
  ) {}

  @Post('sign-in')
  @UsePublic()
  async signIn(@Body() body: SignInDto): Promise<SignInResponse> {
    return this.signInCommand.exec(body);
  }

  @Post('sign-up')
  @UsePublic()
  async signUp(@Body() body: SignupDto): Promise<SignUpResponse> {
    return this.signUpCommand.exec(body);
  }
}
