import { PostgreSqlContainer } from '@testcontainers/postgresql';
// import { GenericContainer } from 'testcontainers';
import 'tsconfig-paths/register';

import { updateTestState } from '@infra/test/test-util/test-state.common';

export default async () => {
  const pgContainer = await new PostgreSqlContainer('postgres:15').start();
  process.env.DATABASE_URL = pgContainer.getConnectionUri();
  globalThis.pgContainer = pgContainer;

  updateTestState({ requireDbSetup: true });
};
