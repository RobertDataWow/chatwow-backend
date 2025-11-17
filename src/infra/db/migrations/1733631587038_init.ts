import { type Kysely, sql } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
  await db.schema
    .createType('users_status')
    .asEnum(['ACTIVE', 'INACTIVE'])
    .execute();

  await db.schema
    .createTable('users')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('email', 'varchar(250)', (col) => col.unique().notNull())
    .addColumn('password', 'varchar(250)', (col) => col.notNull())
    .addColumn('last_signed_in_at', 'timestamptz')
    .addColumn('status', sql`users_status`, (col) =>
      col.notNull().defaultTo('ACTIVE'),
    )
    .execute();

  await db.schema
    .createTable('sessions')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('created_by_id', 'uuid', (col) =>
      col.references('users.id').notNull().onDelete('cascade'),
    )
    .addColumn('secret_hash', 'text', (col) => col.notNull())
    .addColumn('device', 'text', (col) => col.notNull())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('expired_at', 'timestamptz')
    .addColumn('info', 'jsonb', (col) => col.notNull())
    .execute();

  await db.schema
    .createTable('posts')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('updated_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('title', 'varchar(250)', (col) => col.notNull())
    .addColumn('details', 'text', (col) => col.defaultTo('').notNull())
    .addColumn('created_by_id', 'uuid', (col) =>
      col.references('users.id').notNull().onDelete('cascade'),
    )
    .execute();

  await db.schema
    .createTable('comments')
    .addColumn('id', 'uuid', (col) => col.primaryKey())
    .addColumn('created_at', 'timestamptz', (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addColumn('comment', 'text', (col) => col.notNull().defaultTo(''))
    .addColumn('post_id', 'uuid', (col) =>
      col.references('posts.id').notNull().onDelete('cascade'),
    )
    .addColumn('created_by_id', 'uuid', (col) =>
      col.references('users.id').notNull().onDelete('cascade'),
    )
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropType('users_status').execute();
  await db.schema.dropTable('users').execute();
  await db.schema.dropTable('posts').execute();
  await db.schema.dropTable('comments').execute();
}
