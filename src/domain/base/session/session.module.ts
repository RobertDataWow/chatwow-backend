import { Module } from '@nestjs/common';

import { SessionRepo } from './session.repo';
import { SessionService } from './session.service';

@Module({
  providers: [SessionService, SessionRepo],
  exports: [SessionService],
})
export class SessionModule {}
