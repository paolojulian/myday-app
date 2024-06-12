import { Migration } from '@/database/migrations/migration.types';

export const taskMigrations = [
  {
    version: 1,
    queries: [
      {
        query: /* sql */ `
          DROP TABLE IF EXISTS task;
        `,
      },
      {
        query: /* sql */ `
          CREATE TABLE task (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT,
            category_id INTEGER,
            started_at INTEGER,
            ended_at INTEGER,
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
