import { ForgotPasswordDispatchEvent } from '@domain/orchestration/queue/types/event.dispatch.type';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppConfig } from '@infra/config';
import { EmailService } from '@infra/global/email/email.service';
import TemplateForgotPassword from '@infra/global/email/template/template.forgot-password';

import { renderHtml } from '@shared/common/common.func';

@Injectable()
export class ForgotPasswordQueueCommand {
  constructor(
    private configService: ConfigService,
    private emailService: EmailService,
  ) {}

  async exec(data: ForgotPasswordDispatchEvent) {
    const appConfig = this.configService.getOrThrow<AppConfig['app']>('app');

    const html = await renderHtml(
      TemplateForgotPassword({
        ...data,
        frontendUrl: appConfig.frontendUrl,
      }),
    );

    await this.emailService.send(data.user.email, 'ลืมรหัสผ่าน', html);
  }
}
