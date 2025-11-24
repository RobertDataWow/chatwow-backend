import { Session } from './session.domain';
import type { SessionNewData } from './types/session.domain.type';

export class SessionFactory {
  static create(data: SessionNewData): Session {
    return Session.new(data);
  }
}
