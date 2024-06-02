export const categoryMigrations = [
  {
    version: 1,
    table: /* sql */ `
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS category (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        category_name TEXT NOT NULL,
        created_at INTEGER,
        updated_at INTEGER,
        deleted_at INTEGER
      );
    `,
  },
];
