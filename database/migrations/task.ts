import { Migration } from '@/database/migrations/migration.types';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import dayjs from 'dayjs';

const today = dayjs();
const today_unix = convertDateToEpoch(today.toDate());

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
            is_completed INTEGER,
            to_buy INTEGER,
            expected_amount REAL,
            reminder_date INTEGER,
            started_at INTEGER,
            ended_at INTEGER,
            created_at INTEGER,
            updated_at INTEGER,
            deleted_at INTEGER,
            FOREIGN KEY(category_id) REFERENCES category(id)
          );
          INSERT INTO task (title, description, category_id, is_completed, to_buy, expected_amount, reminder_date, started_at, ended_at, created_at, updated_at)
          VALUES
            ('Task 1', 'Description 1', 1, 0, 1, 100.0, ${today_unix}, 1633027200, null, 1633027200, 1633027200),
            ('Task 2', 'Description 2', 2, 0, 0, 200.0, ${today_unix}, 1633113600, null, 1633113600, 1633113600),
            ('Task 3', 'Description 3', 1, 0, 1, 300.0, ${today_unix}, 1633200000, 1633200000, 1633200000, 1633200000),
            ('Task 4', 'Description 4', 2, 0, 0, 400.0, ${today_unix}, 1633286400, null, 1633286400, 1633286400),
            ('Task 5', 'Description 5', 1, 1, 1, 500.0, 1633372800, 1633372800, 1633372800, 1633372800, 1633372800),
            ('Task 6', 'Description 6', 2, 0, 0, 600.0, 1633459200, 1633459200, null, 1633459200, 1633459200),
            ('Task 7', 'Description 7', 1, 1, 1, 700.0, 1633545600, 1633545600, 1633545600, 1633545600, 1633545600),
            ('Task 8', 'Description 8', 2, 0, 0, 800.0, 1633632000, 1633632000, null, 1633632000, 1633632000),
            ('Task 9', 'Description 9', 1, 1, 1, 900.0, 1633718400, 1633718400, 1633718400, 1633718400, 1633718400),
            ('Task 10', 'Description 10', 2, 0, 0, 1000.0, 1633804800, 1633804800, null, 1633804800, 1633804800);
        `,
      },
    ],
  },
] satisfies Migration[];
