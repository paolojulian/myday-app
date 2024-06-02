export const expenseMigrations = [
  {
    version: 1,
    table: /* sql */ `
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS expense (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL
        amount REAL NOT NULL,
        description TEXT,
        category_id INTEGER,
        transaction_date TEXT,
        created_at TEXT,
        updated_at TEXT,
        deleted_at TEXT,
        FOREIGN KEY(category_id) REFERENCES category()
      );
    `,
  },
];
