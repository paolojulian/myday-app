import { Migration } from '@/database/migrations/types';

export const categoryMigrations = [
  {
    version: 1,
    table: /* sql */ `
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS category;
      CREATE TABLE category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_name TEXT NOT NULL,
        created_at INTEGER,
        updated_at INTEGER,
        deleted_at INTEGER
      );
    `,
    inserts: null,
  },
] satisfies Migration;
