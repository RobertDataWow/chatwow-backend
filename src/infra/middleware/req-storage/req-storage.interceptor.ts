import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import type { FastifyRequest } from 'fastify';
import { Observable } from 'rxjs';
import { UAParser } from 'ua-parser-js';

import type { ReqData } from '@infra/global/req-storage/req-storage.common';
import { ReqStorage } from '@infra/global/req-storage/req-storage.service';

import { generateUID } from '@shared/common/common.crypto';
import myDayjs from '@shared/common/common.dayjs';
import { LANG_HEADER } from '@shared/http/http.headers';

@Injectable()
export class ReqStorageInterceptor implements NestInterceptor {
  constructor(private reqStorage: ReqStorage) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<FastifyRequest>();
    const uaData = UAParser(request.headers['user-agent']);

    const coreCtx: ReqData = {
      traceId: generateUID(),
      requestTime: myDayjs().toISOString(),
      agent: uaData.ua,
      device: uaData.device,
      os: uaData.os?.name || '',
      ip: request.ip || '',
      browser: uaData.browser?.name || '',
      lang: (request.headers[LANG_HEADER] as any) || null,
    };

    return this.reqStorage.run(coreCtx, () => next.handle());
  }
}
