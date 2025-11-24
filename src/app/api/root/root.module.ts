import { Module } from '@nestjs/common';

import { HealthModule } from './health/health.module';
import { LineWebhookModule } from './line-webhook/line-webhook.module';

@Module({
  imports: [HealthModule, LineWebhookModule],
})
export class RootModule {}
