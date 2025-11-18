import { Injectable } from '@nestjs/common';

import { LineChatLogRepo } from './line-chat-log.repo';

@Injectable()
export class LineChatLogService {
  constructor(private readonly repo: LineChatLogRepo) {}
  // Implement service methods here
}
