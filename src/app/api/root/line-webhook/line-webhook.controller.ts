import { Body, Controller, Post, RawBodyRequest, Req } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { FastifyRequest } from 'fastify';

import { LineWebHookMessage } from '@infra/global/line/line.type';
import { UsePublic } from '@infra/middleware/jwt/jwt.common';

import { HandleLineWebhookCommand } from './handle-line-webhook/handle-line-webhook.command';
import { HandleLineWebHookResponse } from './handle-line-webhook/handle-line-webhook.dto';

@ApiTags('line-webhook')
@Controller('line-webhook')
export class LineWebhookController {
  constructor(
    //
    private handleWebhookCommand: HandleLineWebhookCommand,
  ) {}

  @Post()
  @UsePublic()
  @ApiResponse({ type: () => HandleLineWebHookResponse })
  async handleWebhook(
    @Req() req: RawBodyRequest<FastifyRequest>,
    @Body() body: LineWebHookMessage,
  ): Promise<HandleLineWebHookResponse> {
    await this.handleWebhookCommand.exec(req, body);

    return {
      success: true,
      key: '',
      data: {},
    };
  }
}
