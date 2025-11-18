import { DomainEntity } from '@shared/common/common.domain';

import type {
  LineAccountNewData,
  LineAccountPg,
  LineAccountPlain,
  LineAccountUpdateData,
} from './types/line-account.domain.type';

export class LineAccount extends DomainEntity<LineAccountPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly role: 'ADMIN' | 'USER';
  readonly userStatus: 'ACTIVE' | 'INACTIVE' | 'PENDING_REGISTRATION';
  readonly lineUid: string | null;

  constructor(plain: LineAccountPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: LineAccountNewData): LineAccount {
    return new LineAccount({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      ...data,
    });
  }

  edit(data: LineAccountUpdateData) {
    Object.assign(this, data);
  }
}
