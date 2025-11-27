import { LineBotMapper } from '@domain/base/line-bot/line-bot.mapper';
import { LineSessionMapper } from '@domain/base/line-session/line-session.mapper';
import { Injectable } from '@nestjs/common';

import {
  LineProcessAiChatJobData,
  LineProcessAiChatJobInput,
} from '@app/worker/line-event/line-process-ai-chat/line-process-ai-chat.type';
import { LineProcessRawJobData } from '@app/worker/line-event/line-process-raw/line-process-raw.type';
import {
  LineProcessSelectionMenuJobData,
  LineProcessSelectionMenuJobInput,
} from '@app/worker/line-event/line-process-selection-menu/line-process-selection-menu.type';
import {
  LineProcessVerificationJobData,
  LineProcessVerificationJobInput,
} from '@app/worker/line-event/line-process-verification/line-process-verification.type';
import { LineSendMessageJobData } from '@app/worker/line-event/line-send-message/line-send-message.type';
import { LINE_EVENT_JOBS } from '@app/worker/worker.job';
import { QUEUE } from '@app/worker/worker.queue';

import { BaseQueue } from '@shared/task/task.abstract';

@Injectable()
export class LineEventQueue extends BaseQueue {
  queueName = QUEUE.LINE_EVENT;

  jobProcessRaw(data: LineProcessRawJobData) {
    this.addJob(LINE_EVENT_JOBS.PROCESS_RAW, data);
  }

  jobProcessVerification(domainData: LineProcessVerificationJobData) {
    const input: LineProcessVerificationJobInput = {
      lineBotJsonState: LineBotMapper.toJsonWithState(domainData.lineBot),
      lineSessionJsonState: LineSessionMapper.toJsonWithState(
        domainData.lineSession,
      ),
      data: domainData.data,
    };

    this.addJob(LINE_EVENT_JOBS.PROCESS_VERIFICATION, input);
  }

  jobProcessSelectionMenu(domainData: LineProcessSelectionMenuJobData) {
    const input: LineProcessSelectionMenuJobInput = {
      lineBotJsonState: LineBotMapper.toJsonWithState(domainData.lineBot),
      lineSessionJsonState: LineSessionMapper.toJsonWithState(
        domainData.lineSession,
      ),
      data: domainData.data,
    };

    this.addJob(LINE_EVENT_JOBS.PROCESS_SELECTION_MENU, input);
  }

  jobProcessAiChat(domainData: LineProcessAiChatJobData) {
    const input: LineProcessAiChatJobInput = {
      lineBotJsonState: LineBotMapper.toJsonWithState(domainData.lineBot),
      lineSessionJsonState: LineSessionMapper.toJsonWithState(
        domainData.lineSession,
      ),
      data: domainData.data,
    };

    this.addJob(LINE_EVENT_JOBS.PROCESS_AI_CHAT, input);
  }

  jobSendMessage(data: LineSendMessageJobData) {
    this.addJob(LINE_EVENT_JOBS.SEND_MESSAGE, data);
  }
}
