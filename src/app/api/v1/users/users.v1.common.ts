import z from 'zod';

export const commonUserSort = ['id', 'createdAt'] as const;
export const commonUserFilter = {
  email: z.string().optional(),
};
