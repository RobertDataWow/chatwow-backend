import { LineChatLog } from './line-chat-log.domain';
import type { LineChatLogNewData } from './line-chat-log.type';

export class LineChatLogFactory {
  static create(data: LineChatLogNewData): LineChatLog {
    return LineChatLog.new(data);
  }
}
