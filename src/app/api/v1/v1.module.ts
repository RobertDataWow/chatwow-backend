import { Module } from '@nestjs/common';

import { AuthV1Module } from './auth/auth.v1.module';
import { UsersV1Module } from './users/users.v1.module';

@Module({
  imports: [
    //
    AuthV1Module,
    UsersV1Module,
  ],
})
export class V1Module {}
