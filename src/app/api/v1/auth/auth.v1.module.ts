import { Module } from '@nestjs/common';

import { AuthV1Controller } from './auth.v1.controller';
import { SignInCommand } from './sign-in/sign-in.command';
import { SignUpCommand } from './sign-up/sign-up.command';

@Module({
  controllers: [AuthV1Controller],
  providers: [SignInCommand, SignUpCommand],
})
export class AuthV1Module {}
