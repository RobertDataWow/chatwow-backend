import { Injectable } from '@nestjs/common';

import { LineAccountRepo } from './line-account.repo';

@Injectable()
export class LineAccountService {
  constructor(private readonly repo: LineAccountRepo) {}
  // Implement service methods here
}
