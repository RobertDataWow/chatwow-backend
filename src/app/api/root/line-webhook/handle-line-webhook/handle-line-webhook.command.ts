import { Injectable, RawBodyRequest } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { FastifyRequest } from 'fastify';

import { AppConfig } from '@infra/config';
import { LineService } from '@infra/global/line/line.service';
import { LineWebHookMessage } from '@infra/global/line/line.type';

import { getLineInfoFromReq } from '@shared/common/common.line';

@Injectable()
export class HandleLineWebhookCommand {
  constructor(private configService: ConfigService) {}

  async exec(req: RawBodyRequest<FastifyRequest>, body: LineWebHookMessage) {
    const lineConfig = this.configService.getOrThrow<AppConfig['line']>('line');

    const lineService = new LineService({
      channelAccessToken: lineConfig.defaultAccessToken,
      channelSecret: lineConfig.defaultSecret,
    });
    lineService.validateSignature(getLineInfoFromReq(req));

    console.log('==================================');
    console.log(body);
    console.log('==================================');

    return;
  }
}
