import { LineChatLog } from './line-chat-log.domain';
import type { LineChatLogPlain } from './types/line-chat-log.domain.type';

export class LineChatLogMapper {
  static fromPlain(plain: LineChatLogPlain): LineChatLog {
    return new LineChatLog(plain);
  }
  static toPlain(domain: LineChatLog): LineChatLogPlain {
    return { ...domain };
  }
}
