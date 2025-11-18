import { LineSession } from './line-session.domain';
import type { LineSessionPlain } from './types/line-session.domain.type';

export class LineSessionMapper {
  static fromPlain(plain: LineSessionPlain): LineSession {
    return new LineSession(plain);
  }
  static toPlain(domain: LineSession): LineSessionPlain {
    return { ...domain };
  }
}
