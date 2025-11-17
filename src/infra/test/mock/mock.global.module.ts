import { Global, Module, Provider } from '@nestjs/common';

import { LoggerService } from '@infra/global/logger/logger.service';
import { TransactionService } from '@infra/global/transaction/transaction.service';

const serviceProviders: Provider[] = [TransactionService, LoggerService];

@Global()
@Module({
  providers: serviceProviders,
  exports: serviceProviders,
})
export class MockGlobalModule {}
