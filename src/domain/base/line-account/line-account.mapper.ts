import { LineAccount } from './line-account.domain';
import type { LineAccountPlain } from './types/line-account.domain.type';

export class LineAccountMapper {
  static fromPlain(plain: LineAccountPlain): LineAccount {
    return new LineAccount(plain);
  }
  static toPlain(domain: LineAccount): LineAccountPlain {
    return { ...domain };
  }
}
