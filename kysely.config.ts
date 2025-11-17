import { defineConfig } from 'kysely-ctl';
import 'tsconfig-paths/register';

import { config } from '@infra/config';
import getKysely from '@infra/db/db.kysely';

export default defineConfig({
  kysely: getKysely(config().database),
  migrations: {
    migrationFolder: './src/infra/db/migrations',
  },
});
