import { DomainEntity } from '@shared/common/common.domain';

import type {
  LineSessionNewData,
  LineSessionPg,
  LineSessionPlain,
  LineSessionUpdateData,
} from './types/line-session.domain.type';

export class LineSession extends DomainEntity<LineSessionPg> {
  readonly id: string;
  readonly createdAt: Date;
  readonly updatedAt: Date;
  readonly lineAccountId: string;
  readonly projectId: string;

  constructor(plain: LineSessionPlain) {
    super();
    Object.assign(this, plain);
  }

  static new(data: LineSessionNewData): LineSession {
    return new LineSession({
      id: crypto.randomUUID(),
      createdAt: new Date(),
      updatedAt: new Date(),
      ...data,
    });
  }

  edit(data: LineSessionUpdateData) {
    Object.assign(this, data);
  }
}
