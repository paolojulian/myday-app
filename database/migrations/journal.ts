import { Migration } from '@/database/migrations/types';

export const journalMigrations = [
  {
    version: 1,
    table: /* sql */ `
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS journal;
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
    inserts: null,
  },
] satisfies Migration;
