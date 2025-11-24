import { Injectable } from '@nestjs/common';

import { LineWebHookMessage } from '@infra/global/line/line.type';

type MessageType = 'verification' | 'selectionMenu' | 'aiChat';

@Injectable()
export class ProcessRawLineCommand {
  async exec(data: LineWebHookMessage) {
    const _messageType = await this.getMessageType(data);

    console.log('==================================');
    console.log(data);
    console.log('==================================');
  }

  async getMessageType(_data: LineWebHookMessage): Promise<MessageType> {
    return 'verification';
  }

  processVerification() {}
  processSelectionMenu() {}
  processAiChat() {}
}
