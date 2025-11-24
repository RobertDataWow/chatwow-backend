import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { UsePublic } from '@infra/middleware/jwt/jwt.common';

import {
  getRefreshCookie,
  setRefreshCookie,
} from '@shared/common/common.cookie';
import { ApiException } from '@shared/http/http.exception';

import { RefreshCommand } from './refresh/refresh.command';
import { RefreshResponse } from './refresh/refresh.dto';
import { SignInCommand } from './sign-in/sign-in.command';
import { SignInDto, SignInResponse } from './sign-in/sign-in.dto';

@Controller({ path: 'auth', version: '1' })
export class AuthV1Controller {
  constructor(
    private signInCommand: SignInCommand,
    private refreshCommand: RefreshCommand,
  ) {}

  @Post('sign-in')
  @UsePublic()
  @ApiResponse({ type: SignInResponse })
  async signIn(
    @Body() body: SignInDto,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<SignInResponse> {
    const { response, plainToken } = await this.signInCommand.exec(body);
    setRefreshCookie(res, plainToken);

    return response;
  }

  @Post('refresh')
  @UsePublic()
  @ApiResponse({ type: RefreshResponse })
  async refresh(
    @Req() req: FastifyRequest,
    @Res({ passthrough: true }) res: FastifyReply,
  ): Promise<RefreshResponse> {
    const reqToken = getRefreshCookie(req);
    if (!reqToken) {
      throw new ApiException(403, 'invalidSessionToken');
    }

    const { response, plainToken } = await this.refreshCommand.exec(reqToken);
    setRefreshCookie(res, plainToken);

    return response;
  }
}
