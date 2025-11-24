import type { RawBodyRequest } from '@nestjs/common';
import type { FastifyRequest } from 'fastify';

export function getLineInfoFromReq(req: RawBodyRequest<FastifyRequest>) {
  const signature = (req.headers['x-line-signature'] as string) || null;
  const rawBody = req.rawBody || null;

  return {
    signature,
    rawBody,
  };
}
