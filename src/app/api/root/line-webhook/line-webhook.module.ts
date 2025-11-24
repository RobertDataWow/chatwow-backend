import { Module } from '@nestjs/common';

import { HandleLineWebhookCommand } from './handle-line-webhook/handle-line-webhook.command';
import { LineWebhookController } from './line-webhook.controller';

@Module({
  providers: [HandleLineWebhookCommand],
  controllers: [LineWebhookController],
})
export class LineWebhookModule {}
