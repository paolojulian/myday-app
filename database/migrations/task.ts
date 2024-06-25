import { Migration } from '@/database/migrations/migration.types';
import TaskFactory from '@/hooks/services/task/TaskFactory';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import dayjs from 'dayjs';

const today = dayjs();
const today_unix = convertDateToEpoch(today.toDate());

const tasksWithReccurence = [
  new TaskFactory({
    title: 'Task 21',
    description: 'Description 21',
    category_id: 1,
    is_completed: 0,
    to_buy: 0,
    expected_amount: 0,
    reminder_date: today_unix,
    started_at: null,
    ended_at: null,
    created_at: today.subtract(4, 'months').unix(),
    updated_at: today.subtract(4, 'months').unix(),
    recurrence_type: 'monthly',
    recurrence_days: null,
    recurrence_id: null,
  }),
  new TaskFactory({
    title: 'Task 21',
    description: 'Description 21',
    category_id: 1,
    is_completed: 0,
    to_buy: 0,
    expected_amount: 0,
    reminder_date: today_unix,
    started_at: null,
    ended_at: null,
    created_at: today.subtract(3, 'months').unix(),
    updated_at: today.subtract(3, 'months').unix(),
    recurrence_type: null,
    recurrence_days: null,
    recurrence_id: 21,
  }),
  new TaskFactory({
    title: 'Task 21',
    description: 'Description 21',
    category_id: 1,
    is_completed: 0,
    to_buy: 0,
    expected_amount: 0,
    reminder_date: today_unix,
    started_at: null,
    ended_at: null,
    created_at: today.subtract(2, 'months').unix(),
    updated_at: today.subtract(2, 'months').unix(),
    recurrence_type: null,
    recurrence_days: null,
    recurrence_id: 21,
  }),
];

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
            recurrence_type TEXT, -- 'daily', 'weekly', 'monthly', 'yearly', 'custom'
            recurrence_days TEXT, -- '1,3,5' for Monday, Wednesday, Friday
            last_completed_date INTEGER, -- For recurring tasks, the last time it was completed.
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
            ('Task 10', 'Description 10', 2, 0, 0, 1000.0, 1633804800, 1633804800, null, 1633804800, 1633804800),
            ('Task 11', 'Description 1', 1, 0, 1, 100.0, ${today_unix}, 1633027200, null, 1633027200, 1633027200),
            ('Task 12', 'Description 2', 2, 0, 0, 200.0, ${today_unix}, 1633113600, null, 1633113600, 1633113600),
            ('Task 13', 'Description 3', 1, 0, 1, 300.0, ${today_unix}, 1633200000, 1633200000, 1633200000, 1633200000),
            ('Task 14', 'Description 4', 2, 0, 0, 400.0, ${today_unix}, 1633286400, null, 1633286400, 1633286400),
            ('Task 15', 'Description 5', 1, 1, 1, 500.0, 1633372800, 1633372800, 1633372800, 1633372800, 1633372800),
            ('Task 16', 'Description 6', 2, 0, 0, 600.0, 1633459200, 1633459200, null, 1633459200, 1633459200),
            ('Task 17', 'Description 7', 1, 1, 1, 700.0, 1633545600, 1633545600, 1633545600, 1633545600, 1633545600),
            ('Task 18', 'Description 8', 2, 0, 0, 800.0, 1633632000, 1633632000, null, 1633632000, 1633632000),
            ('Task 19', 'Description 9', 1, 1, 1, 900.0, 1633718400, 1633718400, 1633718400, 1633718400, 1633718400),
            ('Task 20', 'Description 10', 2, 0, 0, 1000.0, 1633804800, 1633804800, null, 1633804800, 1633804800);

          -- Recurring tasks
          ${tasksWithReccurence[0].toQuery()}
          VALUES 
            ${tasksWithReccurence[0].toInsertValues()};
            ${tasksWithReccurence[1].toInsertValues()};
        `,
      },
    ],
  },
] satisfies Migration[];
