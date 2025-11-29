import myDayjs from '@shared/common/common.dayjs';
import { DomainEntity } from '@shared/common/common.domain';

import { LineAccountMapper } from './line-account.mapper';
import type {
  LineAccountNewData,
  LineAccountPg,
  LineAccountPlain,
} from './line-account.type';

export class LineAccount extends DomainEntity<LineAccountPg> {
  readonly id: string;
  readonly createdAt: Date;

  constructor(plain: LineAccountPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: LineAccountNewData): LineAccount {
    return LineAccountMapper.fromPlain({
      id: data.id,
      createdAt: myDayjs().toDate(),
    });
  }
}
