import { ApiProperty } from '@nestjs/swagger';

import { StandardResponse } from '@shared/http/http.response.dto';

// ==================== Response ====================

export class HandleLineWebHookResponse extends StandardResponse {
  @ApiProperty()
  data: object;
}
