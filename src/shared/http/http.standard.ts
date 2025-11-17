import type { SetRequired } from 'type-fest';

export type FieldsErrorKey = 'exists';

export type IPaginationSchema = {
  page: number;
  nextPage: number;
  previousPage: number;
  perPage: number;
  totalItems: number;
  currentPageItems: number;
  totalPages: number;
};

export type IPaginationMeta = {
  pagination: IPaginationSchema;
};

export type IStandardResponse<
  D extends Record<string, any> = object | object[],
  M extends Record<string, any> = object,
> = {
  success: boolean;
  key: string;
  data: D;
  meta?: M;
};
export type IStandardResponseWithMeta<
  D extends Record<string, any> = object | object[],
  M extends Record<string, any> = object,
> = SetRequired<IStandardResponse<D, M>, 'meta'>;

export type IStandardErrorResonse = {
  success: boolean;
  key: string;
  error?: {
    fields: Record<string, any>;
    context: Record<string, any>;
    details: any;
  };
};
