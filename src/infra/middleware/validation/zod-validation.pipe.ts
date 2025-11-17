import { createZodValidationPipe } from 'nestjs-zod';
import type { ZodError } from 'zod';

import { ApiException } from '@shared/http/http.exception';

function setNestedKey(
  target: Record<string, any>,
  path: (string | number)[],
  message: string,
): void {
  let curr = target;

  for (let i = 0; i < path.length; i++) {
    const key = path[i];

    if (i === path.length - 1) {
      curr[key] = [message];
    } else {
      curr[key] ||= {};
      curr = curr[key];
    }
  }
}

export const CoreZodValidationPipe: any = createZodValidationPipe({
  // provide custom validation exception factory
  createValidationException: (error: unknown) => {
    const zodError = error as ZodError;

    const fields = {};
    for (const err of zodError.errors) {
      setNestedKey(fields, err.path, err.message);
    }

    let message = 'invalidJson';
    if (!Object.keys(fields).length) {
      message = zodError?.errors?.[0].message || message;
    }

    return new ApiException(400, message, {
      info: { fields, context: {} },
    });
  },
});
