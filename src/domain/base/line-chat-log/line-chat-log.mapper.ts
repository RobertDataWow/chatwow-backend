import { toDate, toISO } from '@shared/common/common.transformer';

import { LineChatLog } from './line-chat-log.domain';
import type { LineChatLogResponse } from './line-chat-log.response';
import type {
  LineChatLogJson,
  LineChatLogPg,
  LineChatLogPlain,
} from './types/line-chat-log.domain.type';

export class LineChatLogMapper {
  static fromPg(pg: LineChatLogPg): LineChatLog {
    const plain: LineChatLogPlain = {
      id: pg.id,
      message: pg.message,
      createdAt: toDate(pg.created_at),
      lineSessionId: pg.line_session_id,
      chatSender: pg.chat_sender,
    };

    return new LineChatLog(plain);
  }

  static fromPgWithState(pg: LineChatLogPg): LineChatLog {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plainData: LineChatLogPlain): LineChatLog {
    const plain: LineChatLogPlain = {
      id: plainData.id,
      message: plainData.message,
      createdAt: toDate(plainData.createdAt),
      lineSessionId: plainData.lineSessionId,
      chatSender: plainData.chatSender,
    };

    return new LineChatLog(plain);
  }

  static fromJson(json: LineChatLogJson): LineChatLog {
    const plain: LineChatLogPlain = {
      id: json.id,
      message: json.message,
      createdAt: toDate(json.createdAt),
      lineSessionId: json.lineSessionId,
      chatSender: json.chatSender,
    };

    return new LineChatLog(plain);
  }

  static toPg(domain: LineChatLog): LineChatLogPg {
    return {
      id: domain.id,
      chat_sender: domain.chatSender,
      created_at: toISO(domain.createdAt),
      line_session_id: domain.lineSessionId,
      message: domain.message,
    };
  }

  static toPlain(domain: LineChatLog): LineChatLogPlain {
    return {
      id: domain.id,
      message: domain.message,
      createdAt: domain.createdAt,
      lineSessionId: domain.lineSessionId,
      chatSender: domain.chatSender,
    };
  }

  static toJson(domain: LineChatLog): LineChatLogJson {
    return {
      id: domain.id,
      message: domain.message,
      createdAt: toISO(domain.createdAt),
      lineSessionId: domain.lineSessionId,
      chatSender: domain.chatSender,
    };
  }

  static toResponse(domain: LineChatLog): LineChatLogResponse {
    return {
      id: domain.id,
      message: domain.message,
      createdAt: toISO(domain.createdAt),
      lineSessionId: domain.lineSessionId,
      chatSender: domain.chatSender,
    };
  }
}
