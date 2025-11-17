import { Command, CommandRunner } from 'nest-commander';

import { TransactionService } from '@infra/global/transaction/transaction.service';

@Command({
  name: 'initials:seed',
  description: 'Create record in initials table',
})
export class InitialsCliSeed extends CommandRunner {
  constructor(private transactionService: TransactionService) {
    super();
  }

  async run(_passedParams: string[]): Promise<void> {
    try {
      await this.transactionService.transaction(async () => this._initAll());
    } catch (error) {
      console.log('==================================');
      console.log(error);
      console.log('==================================');
    }
  }

  private async _initAll(): Promise<void> {}
}
