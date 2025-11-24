import { Module } from '@nestjs/common';

import { createBullmqHandler } from '@shared/common/common.worker';

import { QUEUE } from '../worker.queue';
import { LineEventBullmq } from './line-event.bullmq';
import { LineProcessAiChatCommand } from './line-process-ai-chat/line-process-ai-chat.command';
import { LineProcessRawCommand } from './line-process-raw/line-process-raw.command';
import { LineProcessSelectionMenuCommand } from './line-process-selection-menu/line-process-selection-menu.command';
import { LineProcessVerificationCommand } from './line-process-verification/line-process-verification.command';
import { LineSendMessageCommand } from './line-send-message/line-send-message.command';

@Module({
  providers: [
    LineProcessRawCommand,
    LineSendMessageCommand,
    LineProcessSelectionMenuCommand,
    LineProcessVerificationCommand,
    LineProcessAiChatCommand,

    //
    createBullmqHandler(QUEUE.LINE_EVENT, LineEventBullmq),
  ],
})
export class LineEventWorkerModule {}
