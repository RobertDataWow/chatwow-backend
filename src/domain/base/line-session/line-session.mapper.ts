import { toDate, toISO } from '@shared/common/common.transformer';

import { LineSession } from './line-session.domain';
import type {
  LineSessionJson,
  LineSessionJsonState,
  LineSessionPg,
  LineSessionPlain,
} from './line-session.type';

export class LineSessionMapper {
  static fromPg(pg: LineSessionPg): LineSession {
    const plain: LineSessionPlain = {
      id: pg.id,
      latestChatLogId: pg.latest_chat_log_id,
      createdAt: toDate(pg.created_at),
      updatedAt: toDate(pg.updated_at),
      lineAccountId: pg.line_account_id,
      projectId: pg.project_id,
      lineSessionStatus: pg.line_session_status,
      lineBotId: pg.line_bot_id,
    };

    return new LineSession(plain);
  }

  static fromPgWithState(pg: LineSessionPg): LineSession {
    return this.fromPg(pg).setPgState(this.toPg);
  }

  static fromPlain(plain: LineSessionPlain): LineSession {
    return new LineSession({
      id: plain.id,
      createdAt: plain.createdAt,
      updatedAt: plain.updatedAt,
      lineAccountId: plain.lineAccountId,
      projectId: plain.projectId,
      latestChatLogId: plain.latestChatLogId,
      lineSessionStatus: plain.lineSessionStatus,
      lineBotId: plain.lineBotId,
    });
  }

  static fromJson(json: LineSessionJson): LineSession {
    const plain: LineSessionPlain = {
      id: json.id,
      createdAt: new Date(json.createdAt),
      updatedAt: new Date(json.updatedAt),
      lineAccountId: json.lineAccountId,
      projectId: json.projectId,
      latestChatLogId: json.latestChatLogId,
      lineSessionStatus: json.lineSessionStatus,
      lineBotId: json.lineBotId,
    };

    return new LineSession(plain);
  }

  static fromJsonWithState(data: LineSessionJsonState): LineSession {
    const lineSession = this.fromJson(data.data);
    lineSession.setPgState(data.state);

    return lineSession;
  }

  static toPg(lineSession: LineSession): LineSessionPg {
    return {
      id: lineSession.id,
      created_at: toISO(lineSession.createdAt),
      updated_at: toISO(lineSession.updatedAt),
      line_account_id: lineSession.lineAccountId,
      project_id: lineSession.projectId,
      latest_chat_log_id: lineSession.latestChatLogId,
      line_session_status: lineSession.lineSessionStatus,
      line_bot_id: lineSession.lineBotId,
    };
  }

  static toPlain(lineSession: LineSession): LineSessionPlain {
    return {
      id: lineSession.id,
      createdAt: lineSession.createdAt,
      updatedAt: lineSession.updatedAt,
      lineAccountId: lineSession.lineAccountId,
      projectId: lineSession.projectId,
      latestChatLogId: lineSession.latestChatLogId,
      lineSessionStatus: lineSession.lineSessionStatus,
      lineBotId: lineSession.lineBotId,
    };
  }

  static toJson(lineSession: LineSession): LineSessionJson {
    return {
      id: lineSession.id,
      createdAt: lineSession.createdAt.toISOString(),
      updatedAt: lineSession.updatedAt.toISOString(),
      lineAccountId: lineSession.lineAccountId,
      projectId: lineSession.projectId,
      latestChatLogId: lineSession.latestChatLogId,
      lineSessionStatus: lineSession.lineSessionStatus,
      lineBotId: lineSession.lineBotId,
    };
  }

  static toJsonWithState(lineSession: LineSession): LineSessionJsonState {
    return {
      data: LineSessionMapper.toJson(lineSession),
      state: lineSession.pgState,
    };
  }
}
