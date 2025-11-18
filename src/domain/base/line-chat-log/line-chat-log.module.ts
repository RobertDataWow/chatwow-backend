import { Module } from '@nestjs/common';

import { LineChatLogRepo } from './line-chat-log.repo';
import { LineChatLogService } from './line-chat-log.service';

@Module({
  providers: [LineChatLogService, LineChatLogRepo],
  exports: [LineChatLogService],
})
export class LineChatLogModule {}
