import { Migration } from '@/database/migrations/migration.types';

export const expenseMigrations = [
  {
    version: 1,
    queries: [
      {
        query: /* sql */ `
          DROP TABLE IF EXISTS expense;
        `,
      },
      {
        query: /* sql */ `
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
          INSERT INTO expense (title, amount, description, category_id, transaction_date, created_at, updated_at, deleted_at)
          VALUES
            ('Expense 1', 10.99, 'Dummy expense 1', 1, 1635724800, 1635724800, 1635724800, NULL),
            ('Expense 2', 20.99, 'Dummy expense 2', 2, 1635811200, 1635724800, 1635724800, NULL),
            ('Expense 3', 30.99, 'Dummy expense 3', 3, 1635897600, 1635724800, 1635724800, NULL),
            ('Expense 4', 40.99, 'Dummy expense 4', 4, 1635984000, 1635724800, 1635724800, NULL),
            ('Expense 5', 50.99, 'Dummy expense 5', 5, 1636070400, 1635724800, 1635724800, NULL),
            ('Expense 6', 60.99, 'Dummy expense 6', 6, 1636156800, 1635724800, 1635724800, NULL),
            ('Expense 7', 70.99, 'Dummy expense 7', 7, 1636243200, 1635724800, 1635724800, NULL),
            ('Expense 8', 80.99, 'Dummy expense 8', 8, 1636329600, 1635724800, 1635724800, NULL),
            ('Expense 9', 90.99, 'Dummy expense 9', 9, 1636416000, 1635724800, 1635724800, NULL),
            ('Expense 10', 100.99, 'Dummy expense 10', 10, 1636502400, 1635724800, 1635724800, NULL);
        `,
      },
    ],
  },
] satisfies Migration[];
