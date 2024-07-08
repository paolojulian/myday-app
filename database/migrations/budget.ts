import { Migration } from '@/database/migrations/migration.types';

export const budgetMigrations = [
  {
    version: 1,
    queries: [
      {
        query: /* sql */ `
          DROP TABLE IF EXISTS budget;
        `,
      },
      {
        query: /* sql */ `
          CREATE TABLE budget (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            amount INTEGER NOT NULL,
            created_at INTEGER
          );
           INSERT INTO budget (amount, created_at)
           VALUES (20000, 1633804800);
        `,
      },
    ],
  },
] satisfies Migration[];
