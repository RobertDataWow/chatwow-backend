import { ApiProperty } from '@nestjs/swagger';

import {
  IPaginationMeta,
  IPaginationSchema,
  IStandardResponse,
} from './http.standard';

class PaginationResponseSchema implements IPaginationSchema {
  page: number;
  nextPage: number;
  previousPage: number;
  perPage: number;
  totalItems: number;
  currentPageItems: number;
  totalPages: number;
}

export class PaginationMetaResponse implements IPaginationMeta {
  pagination: PaginationResponseSchema;
}

export class CursorMetaResponse {
  nextCursor: string | null;
}

export abstract class StandardResponse implements IStandardResponse<any, any> {
  @ApiProperty({ example: true })
  success: boolean;

  @ApiProperty({ example: '' })
  key: string;

  abstract data: any;
  meta?: any;
}
