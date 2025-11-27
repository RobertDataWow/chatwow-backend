import { LineEventQueue } from '@domain/orchestration/queue/line-event/line-event.queue';
import { Injectable, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';

import { AppConfig } from '@infra/config';
import { LineService } from '@infra/global/line/line.service';
import { LineWebHookMessage } from '@infra/global/line/line.type';

import { getLineInfoFromReq } from '@shared/common/common.line';

@Injectable()
export class HandleLineWebhookCommand {
  constructor(
    private configService: ConfigService,
    private lineEventQueue: LineEventQueue,
  ) {}

  async exec(
    req: RawBodyRequest<FastifyRequest>,
    lineBotId: string,
    data: LineWebHookMessage,
  ) {
    const lineConfig = this.configService.getOrThrow<AppConfig['line']>('line');

    const channelAccessToken = lineConfig.defaultAccessToken;
    const channelSecret = lineConfig.defaultSecret;
    const lineService = new LineService({
      channelAccessToken,
      channelSecret,
    });
    lineService.validateSignature(getLineInfoFromReq(req));

    this.lineEventQueue.jobProcessRaw({
      lineBotId,
      config: {
        channelAccessToken,
        channelSecret,
      },
      data,
    });

    return;
  }
}
