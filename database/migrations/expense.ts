export const expenseMigrations = [
  {
    version: 1,
    table: /* sql */ `
      PRAGMA journal_mode = 'wal';
      DROP TABLE IF EXISTS expense;
      CREATE TABLE expense (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT NOT NULL,
        amount REAL NOT NULL,
        description TEXT,
        category_id INTEGER,
        transaction_date INTEGER,
        created_at INTEGER,
        updated_at INTEGER,
        deleted_at INTEGER,
        FOREIGN KEY(category_id) REFERENCES category(id)
      );
    `,
  },
];
