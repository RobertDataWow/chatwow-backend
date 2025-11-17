import type { INestApplicationContext, Provider } from '@nestjs/common';
import type { Job } from 'bullmq';
import { Worker } from 'bullmq';

import { config } from '@infra/config';

import { QUEUE } from '@app/worker/worker.queue';

const redisConfig = config().redis;

function addNamePrefix(name: string) {
  return `worker-${name}`;
}

export function createWorker(app: INestApplicationContext) {
  for (const key of Object.values(QUEUE)) {
    try {
      const handler = app.get(addNamePrefix(key));
      new Worker(
        key,
        async (job: Job) => {
          await handler.dispatch(job);
        },
        { connection: { url: redisConfig.url } },
      );
    } catch {
      console.log('==================================');
      console.log(`Queue handler ${key} not found`);
      console.log('==================================');
      continue;
    }
  }
}

export function createBullmqHandler(key: QUEUE, clazz: any): Provider {
  return {
    provide: addNamePrefix(key),
    useClass: clazz,
  };
}
