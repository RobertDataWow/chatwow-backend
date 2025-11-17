import type { ExecutionContext } from '@nestjs/common';
import { createParamDecorator } from '@nestjs/common';
import type { FastifyReply, FastifyRequest } from 'fastify';

import { getTransaltionFunc } from '@infra/global/lang/lang.common';
import type { TranslationFunctions } from '@infra/i18n/i18n-types';

import { writeCsv as writeCsvData } from '../common/common.csv';
import { CSV_HEADER, LANG_HEADER } from './http.headers';

export type CsvParam = {
  acceptCsv: boolean;
  writeCsv: (opts: {
    filename: string;
    csv: [string, string | number][][];
  }) => any;
  t: TranslationFunctions;
};
export const CsvParam = createParamDecorator(
  (_data: unknown, ctx: ExecutionContext): CsvParam => {
    const req = ctx.switchToHttp().getRequest<FastifyRequest>();
    const res = ctx.switchToHttp().getResponse<FastifyReply>();
    const acceptHeader = req.headers[CSV_HEADER] || '';

    function writeCsv(opts: {
      filename: string;
      csv: [string, string | number][][];
    }) {
      const filename = encodeURIComponent(opts.filename);
      const stream = writeCsvData(opts.csv);

      res.header('Content-Disposition', `attachment; filename="${filename}"`);
      res.header('Content-Type', 'text/csv');
      res.header('filename', filename);
      res.header(
        'Access-Control-Expose-Headers',
        'Content-Disposition, filename',
      );

      // use .raw because FastifyReply is a wrapper around Node's res
      stream.pipe(res.raw);
      stream.end();
    }

    return {
      acceptCsv: acceptHeader === 'csv',
      writeCsv,
      t: getTransaltionFunc(req.headers[LANG_HEADER] as string),
    };
  },
);
