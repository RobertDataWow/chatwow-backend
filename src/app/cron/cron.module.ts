import { Module } from '@nestjs/common';

import { CronSetup } from './cron.setup';

@Module({
  providers: [CronSetup],
})
export class CronModule {}
