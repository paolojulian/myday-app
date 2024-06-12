import { Migration } from '@/database/migrations/migration.types';

export const categoryMigrations = [
  {
    version: 1,
    queries: [
      {
        query: /* sql */ `
          DROP TABLE IF EXISTS category;
        `,
      },
      {
        query: /* sql */ `
          CREATE TABLE category (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category_name TEXT NOT NULL,
            created_at INTEGER,
            updated_at INTEGER,
            deleted_at INTEGER
          );
        `,
      },
    ],
  },
] satisfies Migration[];
