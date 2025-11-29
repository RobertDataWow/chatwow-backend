import { LineSession } from './line-session.domain';
import type { LineSessionNewData } from './line-session.type';

export class LineSessionFactory {
  static create(data: LineSessionNewData): LineSession {
    return LineSession.new(data);
  }
}
