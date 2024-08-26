import { Migration } from '@/database/migrations/migration.types';

// const startOfMonth = dayjs().startOf('month');
// const inserts = [
//   new ExpenseFactory({
//     id: 1111,
//     title: 'Lunch at Jolibee',
//     amount: 1290,
//     description: 'Lunch',
//     category_id: 2,
//     transaction_date: dayjs().startOf('day').add(8, 'hours').unix(),
//   }).toInsertValues(),
//   new ExpenseFactory({
//     id: 123,
//     title: 'Internet',
//     amount: 1700,
//     description: 'PLDT',
//     category_id: 3,
//     recurrence: 'monthly',
//     transaction_date: startOfMonth.subtract(4, 'months').unix(),
//   }).toInsertValues(),
//   new ExpenseFactory({
//     title: 'Internet',
//     amount: 1700,
//     description: 'PLDT',
//     category_id: 3,
//     recurrence_id: 123,
//     transaction_date: startOfMonth.subtract(3, 'months').unix(),
//   }).toInsertValues(),
//   new ExpenseFactory({
//     id: 1000,
//     title: 'Test Weekly Recurrence',
//     amount: 300,
//     description: 'PLDT',
//     category_id: 3,
//     recurrence: 'weekly',
//     transaction_date: startOfMonth.subtract(3, 'weeks').unix(),
//   }).toInsertValues(),
// ];

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
            recurrence TEXT, /* weekly, monthly, yearly, null */
            recurrence_id INTEGER, /* the parent recurrence for this expense */
            created_at INTEGER,
            updated_at INTEGER,
            deleted_at INTEGER,
            FOREIGN KEY(category_id) REFERENCES category(id),
            FOREIGN KEY(recurrence_id) REFERENCES expense(id)
          );
        `,
        // INSERT INTO expense (id, title, amount, description, category_id, transaction_date, recurrence, recurrence_id, created_at, updated_at, deleted_at)
        // VALUES
        //   (NULL, 'Coffee', 150, 'Coffee at Starbucks', 1, 1717526400, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Lunch', 200, 'Lunch at Jollibee', 1, 1717612800, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Groceries', 3000, 'Groceries from SM Supermarket', 2, 1717699200, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Gas', 2000, 'Gas from Petron', 4, 1717785600, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Utilities', 2500, 'Utility bill payment', 5, 1717872000, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Dinner', 500, 'Dinner at Mang Inasal', 1, 1717958400, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Movie', 300, 'Movie at SM Cinema', 5, 1718044800, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Books', 800, 'Books from National Bookstore', 5, 1718131200, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Gym', 1000, 'Gym membership', 5, 1718217600, NULL, NULL, 1635724800, 1635724800, NULL),
        //   (NULL, 'Rent', 8000, 'Monthly rent', 5, 1718304000, NULL, NULL, 1635724800, 1635724800, NULL),
        //   ${inserts.join(',\n')}
        //   ;
      },
    ],
  },
] satisfies Migration[];
