export const expensesMigrations = [
  {
    version: 1,
    table: /* sql */ `
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS Expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        description TEXT NOT NULL
      );
    `,
    inserts: /* sql */ `
      INSERT INTO Expenses (amount, description) VALUES (100000, 'Gambling allowance')
    `,
  },
  {
    version: 2,
    table: /* sql */ `
      PRAGMA journal_mode = 'wal';
      CREATE TABLE IF NOT EXISTS Expenses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        amount REAL NOT NULL,
        name TEXT NOT NULL,
        description TEXT NOT NULL
      );
    `,
    inserts: /* sql */ `
      DELETE FROM Expenses;
    `,
  },
];
