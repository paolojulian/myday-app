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
          INSERT INTO category (category_name, created_at, updated_at, deleted_at)
          VALUES
            ('Grocery', 1635724800, 1635724800, NULL),
            ('Restaurant', 1635724800, 1635724800, NULL),
            ('Bills', 1635724800, 1635724800, NULL),
            ('Transport', 1635724800, 1635724800, NULL),
            ('Entertainment', 1635724800, 1635724800, NULL),
            ('Misc', 1635724800, 1635724800, NULL);
        `,
      },
    ],
  },
] satisfies Migration[];
