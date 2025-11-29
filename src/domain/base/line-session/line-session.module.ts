import { Module } from '@nestjs/common';

import { LineSessionService } from './line-session.service';

@Module({
  providers: [LineSessionService],
  exports: [LineSessionService],
})
export class LineSessionModule {}
