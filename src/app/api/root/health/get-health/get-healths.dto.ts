import type { HealthCheckStatus } from '@nestjs/terminus';

import { StandardResponse } from '@shared/http/http.response.dto';

export class GetHealthResponseData {
  status: HealthCheckStatus;
  // heap: string;
  // rss: string;
  // db: string;
}

export class GetHealthResponse extends StandardResponse {
  data: GetHealthResponseData;
}
