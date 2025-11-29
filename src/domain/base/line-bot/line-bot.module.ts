import { Module } from '@nestjs/common';

import { LineBotService } from './line-bot.service';

@Module({
  providers: [LineBotService],
  exports: [LineBotService],
})
export class LineBotModule {}
