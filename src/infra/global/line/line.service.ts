import { messagingApi } from '@line/bot-sdk';
import { createHmac } from 'crypto';

import { ApiException } from '@shared/http/http.exception';

import { ValidateSignatureOpts } from './line.type';

export class LineService {
  lineApi: messagingApi.MessagingApiClient;
  channelSecret: string;

  constructor(opts: { channelAccessToken: string; channelSecret: string }) {
    this.lineApi = new messagingApi.MessagingApiClient({
      channelAccessToken: opts.channelAccessToken,
    });
    this.channelSecret = opts.channelSecret;
  }

  validateSignature({ signature, rawBody }: ValidateSignatureOpts) {
    if (!signature) {
      throw new ApiException(400, 'invalidSignature');
    }

    if (!rawBody) {
      throw new ApiException(400, 'invalidSignature');
    }

    const computed = createHmac('sha256', this.channelSecret)
      .update(rawBody)
      .digest('base64');

    if (computed !== signature) {
      throw new ApiException(400, 'invalidSignature');
    }
  }

  async showLoading(userId: string) {
    await this.lineApi.showLoadingAnimation({
      chatId: userId,
      loadingSeconds: 60,
    });
  }

  async reply(replyToken: string, text: string) {
    await this.lineApi.replyMessage({
      messages: [
        {
          type: 'text',
          text,
        },
      ],
      replyToken,
    });
  }
}
