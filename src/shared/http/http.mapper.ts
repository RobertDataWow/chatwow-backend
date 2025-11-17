import type {
  IStandardResponse,
  IStandardResponseWithMeta,
} from './http.standard';

export class HttpResponseMapper {
  static toSuccess<D extends object | object[], M extends object>(opts: {
    data: D;
    meta: M;
  }): IStandardResponseWithMeta<D, M>;
  static toSuccess<D extends object | object[], M extends object>(opts: {
    data: D;
  }): IStandardResponse<D, M>;
  static toSuccess<D extends object | object[], M extends object>(opts: {
    data: D;
    meta?: M;
  }): IStandardResponse<D, M> {
    return {
      success: true,
      key: '',
      meta: opts.meta,
      data: opts.data,
    };
  }
}
