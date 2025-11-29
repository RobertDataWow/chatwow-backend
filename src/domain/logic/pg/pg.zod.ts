import z from 'zod';

export const tableEnumZod = z.object({
  enumType: z.string().optional(),
});
