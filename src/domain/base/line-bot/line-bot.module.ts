import { Module } from '@nestjs/common';

import { LineBotRepo } from './line-bot.repo';
import { LineBotService } from './line-bot.service';

@Module({
  providers: [LineBotService, LineBotRepo],
  exports: [LineBotService],
})
export class LineBotModule {}
