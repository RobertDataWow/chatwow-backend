import { Injectable } from '@nestjs/common';

import { LINE_EVENT_JOBS } from '@app/worker/worker.job';
import { QUEUE } from '@app/worker/worker.queue';

import { BaseQueue } from '@shared/task/task.abstract';

import {
  LineProcessAiChatJobData,
  LineProcessRawJobData,
  LineProcessSelectionMenuJobData,
  LineProcessVerificationJobData,
  LineSendMessageJobData,
} from './line-event.queue.type';

@Injectable()
export class LineEventQueue extends BaseQueue {
  queueName = QUEUE.LINE_EVENT;

  jobProcessRaw(data: LineProcessRawJobData) {
    this.addJob(LINE_EVENT_JOBS.PROCESS_RAW, data);
  }

  jobProcessVerification(data: LineProcessVerificationJobData) {
    this.addJob(LINE_EVENT_JOBS.PROCESS_VERIFICATION, data);
  }

  jobProcessSelectionMenu(data: LineProcessSelectionMenuJobData) {
    this.addJob(LINE_EVENT_JOBS.PROCESS_SELECTION_MENU, data);
  }

  jobProcessAiChat(data: LineProcessAiChatJobData) {
    this.addJob(LINE_EVENT_JOBS.PROCESS_AI_CHAT, data);
  }

  jobSendMessage(data: LineSendMessageJobData) {
    this.addJob(LINE_EVENT_JOBS.SEND_MESSAGE, data);
  }
}
