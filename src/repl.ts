import { repl } from '@nestjs/core';

import { AppApiModule } from './app/app.module';

async function bootstrap() {
  await repl(AppApiModule);
}
bootstrap();
