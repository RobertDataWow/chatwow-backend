export const QUEUE = {
  DOMAIN_EVENT: 'DOMAIN_EVENT',
  CRONS: 'CRONS',
} as const;

export type QUEUE = (typeof QUEUE)[keyof typeof QUEUE];
