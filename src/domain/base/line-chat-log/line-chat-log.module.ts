import { Module } from '@nestjs/common';

import { LineChatLogService } from './line-chat-log.service';

@Module({
  providers: [LineChatLogService],
  exports: [LineChatLogService],
})
export class LineChatLogModule {}
