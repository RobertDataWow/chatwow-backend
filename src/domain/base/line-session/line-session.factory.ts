import { LineSession } from './line-session.domain';
import type { LineSessionNewData } from './types/line-session.domain.type';

export class LineSessionFactory {
  static create(data: LineSessionNewData): LineSession {
    return LineSession.new(data);
  }
}
