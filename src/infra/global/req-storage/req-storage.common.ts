import type { Locales } from '@infra/i18n/i18n-types';

export type ReqData = {
  traceId: string;
  requestTime: string;
  agent: string;
  browser: string;
  device: UAParser.IDevice;
  os: string;
  ip: string;
  lang: Locales | null;
};
