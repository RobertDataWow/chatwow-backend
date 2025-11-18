import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';

import type {
  LineAccountNewData,
  LineAccountPg,
  LineAccountPlain,
} from './types/line-account.domain.type';

export class LineAccount extends DomainEntity<LineAccountPg> {
  readonly id: string;
  readonly createdAt: Date;

  constructor(plain: LineAccountPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: LineAccountNewData): LineAccount {
    return new LineAccount({
      id: data.id,
      createdAt: myDayjs().toDate(),
    });
  }
}
