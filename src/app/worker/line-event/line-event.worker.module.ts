import { Module } from '@nestjs/common';

import { createBullmqHandler } from '@shared/common/common.worker';

import { QUEUE } from '../worker.queue';
import { LineEventBullmq } from './line-event.bullmq';
import { LineProcessRawCommand } from './line-process-raw/line-process-raw.command';

@Module({
  providers: [
    LineProcessRawCommand,

    //
    createBullmqHandler(QUEUE.LINE_EVENT, LineEventBullmq),
  ],
})
export class LineEventWorkerModule {}
