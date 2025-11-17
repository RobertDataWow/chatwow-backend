import { createZodDto } from 'nestjs-zod';
import type { ZodArray, ZodError } from 'zod';
import { z } from 'zod';

import { setNestedKey } from '../common/common.func';
import { toOptionalNumber, toSet } from '../common/common.transformer';
import type { ParsedSort, SortDir } from '../common/common.type';

export const zodDto = createZodDto;

export function zodResponse(
  data: z.AnyZodObject | ZodArray<z.AnyZodObject>,
  meta?: z.AnyZodObject,
) {
  const res = {
    success: z.boolean(),
    key: z.string(),
    data,
    meta: z.object({}).optional(),
  };

  if (meta) {
    res.meta = meta as any;
  }

  const standard = z.object(res);

  return zodDto(standard);
}

export function getPerPageZod() {
  return z.string().optional().transform(toOptionalNumber);
}
export function getPaginationZod() {
  return z
    .object({
      page: z.string().optional().transform(toOptionalNumber),
      perPage: getPerPageZod(),
    })
    .optional();
}

export function getZodErrorFields(zodErr: ZodError) {
  const fields = {};
  for (const err of zodErr.errors) {
    setNestedKey(fields, err.path, err.message);
  }

  return fields;
}

export function getSortZod<T extends string>(fields: readonly [T, ...T[]]) {
  // Ensure non-empty tuple for z.enum
  const [first, ...rest] = fields;
  const enumValues = [
    first as `${T}`,
    `-${first}` as `-${T}`,
    ...rest.flatMap((f) => [f as `${T}`, `-${f}` as `-${T}`] as const),
  ] as [`${T}` | `-${T}`, ...(`${T}` | `-${T}`)[]];

  const SortEnum = z.enum(enumValues);

  return z
    .string()
    .optional()
    .transform((s) => (s ? s.split(',').filter(Boolean) : []))
    .pipe(z.array(SortEnum))
    .transform((parts): ParsedSort<T> | undefined => {
      const res: ParsedSort<T> = [];
      for (const part of parts) {
        const isDesc = part.startsWith('-');
        const key = (isDesc ? part.slice(1) : part) as T;
        const dir: SortDir = isDesc ? 'desc' : 'asc';

        res.push([key, dir]);
      }

      if (!res.length) {
        return undefined;
      }

      return res;
    });
}

export function getIncludesZod<T extends string>(fields: readonly [T, ...T[]]) {
  return z
    .string()
    .optional()
    .transform((s) => (s ? s.split(',').filter(Boolean) : []))
    .pipe(z.array(z.enum(fields)))
    .transform(toSet);
}
