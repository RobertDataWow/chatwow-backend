import { Module } from '@nestjs/common';

import { LineAccountRepo } from './line-account.repo';
import { LineAccountService } from './line-account.service';

@Module({
  providers: [LineAccountService, LineAccountRepo],
  exports: [LineAccountService],
})
export class LineAccountModule {}
