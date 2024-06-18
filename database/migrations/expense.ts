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
            ('Coffee', 150, 'Coffee at Starbucks', 1, 1717526400, 1635724800, 1635724800, NULL),
            ('Lunch', 200, 'Lunch at Jollibee', 1, 1717612800, 1635724800, 1635724800, NULL),
            ('Groceries', 3000, 'Groceries from SM Supermarket', 2, 1717699200, 1635724800, 1635724800, NULL),
            ('Gas', 2000, 'Gas from Petron', 4, 1717785600, 1635724800, 1635724800, NULL),
            ('Utilities', 2500, 'Utility bill payment', 5, 1717872000, 1635724800, 1635724800, NULL),
            ('Dinner', 500, 'Dinner at Mang Inasal', 1, 1717958400, 1635724800, 1635724800, NULL),
            ('Movie', 300, 'Movie at SM Cinema', 5, 1718044800, 1635724800, 1635724800, NULL),
            ('Books', 800, 'Books from National Bookstore', 5, 1718131200, 1635724800, 1635724800, NULL),
            ('Gym', 1000, 'Gym membership', 5, 1718217600, 1635724800, 1635724800, NULL),
            ('Rent', 8000, 'Monthly rent', 5, 1718304000, 1635724800, 1635724800, NULL);
        `,
      },
    ],
  },
] satisfies Migration[];
