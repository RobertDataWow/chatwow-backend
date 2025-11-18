import { LineAccount } from './line-account.domain';
import type { LineAccountNewData } from './types/line-account.domain.type';

export class LineAccountFactory {
  static create(data: LineAccountNewData): LineAccount {
    return LineAccount.new(data);
  }
}
