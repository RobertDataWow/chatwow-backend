import { Module } from '@nestjs/common';

import { CronWorkerModule } from './cron/cron.worker.module';
import { DomainEventWorkerModule } from './domain-event/domain-event.worker.module';

@Module({
  imports: [DomainEventWorkerModule, CronWorkerModule],
})
export class WorkerModule {}
