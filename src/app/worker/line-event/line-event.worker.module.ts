import { Module } from '@nestjs/common';

import { createBullmqHandler } from '@shared/common/common.worker';

import { QUEUE } from '../worker.queue';
import { LineEventBullmq } from './line-event.bullmq';
import { ProcessRawLineCommand } from './process-raw-line/process-raw-line.command';

@Module({
  providers: [
    ProcessRawLineCommand,

    //
    createBullmqHandler(QUEUE.LINE_EVENT, LineEventBullmq),
  ],
})
export class LineEventWorkerModule {}
