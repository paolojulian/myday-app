import { Migration } from '@/database/migrations/migration.types';

export const journalMigrations = [
  {
    version: 1,
    queries: [
      {
        query: /* sql */ `
          DROP TABLE IF EXISTS journal;
        `,
      },
      {
        query: /* sql */ `
          CREATE TABLE journal (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category_id INTEGER,
            entry_date INTEGER,
            created_at INTEGER,
            updated_at INTEGER,
            deleted_at INTEGER,
            FOREIGN KEY(category_id) REFERENCES category(id)
          );
        `,
      },
    ],
  },
] satisfies Migration[];
