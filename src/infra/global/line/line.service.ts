import { Project } from '@domain/base/project/project.domain';
import { messagingApi } from '@line/bot-sdk';
import { createHmac } from 'crypto';

import { LINE_NO_PROJECT_REPLY } from '@app/worker/line-event/line-event.constant';

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

  async showLoading(lineId: string) {
    await this.lineApi.showLoadingAnimation({
      chatId: lineId,
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

  async replyProjectSelection(replyToken: string, projects: Project[]) {
    if (!projects.length) {
      await this.reply(replyToken, LINE_NO_PROJECT_REPLY);
      return;
    }

    await this.lineApi.replyMessage({
      replyToken,
      messages: [
        {
          type: 'flex',
          altText: 'Select a project',
          contents: {
            type: 'bubble',
            body: {
              type: 'box',
              layout: 'vertical',
              contents: [
                {
                  type: 'text',
                  text: 'Select a project',
                  weight: 'bold',
                  size: 'lg',
                },
                {
                  type: 'box',
                  layout: 'vertical',
                  margin: 'md',
                  spacing: 'sm',
                  contents: projects.map((p) => ({
                    type: 'button',
                    action: {
                      type: 'message',
                      label: p.projectName,
                      text: p.id,
                    },
                    style: 'primary',
                  })),
                },
              ],
            },
          },
        },
      ],
    });
  }
}
