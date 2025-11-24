import { Module } from '@nestjs/common';

import { CronWorkerModule } from './cron/cron.worker.module';
import { DomainEventWorkerModule } from './domain-event/domain-event.worker.module';
import { LineEventWorkerModule } from './line-event/line-event.worker.module';

@Module({
  imports: [DomainEventWorkerModule, CronWorkerModule, LineEventWorkerModule],
})
export class WorkerModule {}
