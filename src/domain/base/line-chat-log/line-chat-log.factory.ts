import { LineChatLog } from './line-chat-log.domain';
import type { LineChatLogNewData } from './types/line-chat-log.domain.type';

export class LineChatLogFactory {
  static create(data: LineChatLogNewData): LineChatLog {
    return LineChatLog.new(data);
  }
}
