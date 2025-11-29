import { Module } from '@nestjs/common';

import { ProjectChatService } from './project-chat.service';

@Module({
  providers: [ProjectChatService],
  exports: [ProjectChatService],
})
export class ProjectChatModule {}
