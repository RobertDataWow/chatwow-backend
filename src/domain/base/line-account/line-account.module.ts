import { Module } from '@nestjs/common';

import { LineAccountService } from './line-account.service';

@Module({
  providers: [LineAccountService],
  exports: [LineAccountService],
})
export class LineAccountModule {}
