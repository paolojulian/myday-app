import { Migration } from '@/database/migrations/migration.types';
import dayjs from 'dayjs';

const todayUnix = dayjs().startOf('day').add(8, 'hours').unix();

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
            is_completed INTEGER NOT NULL,
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
          INSERT INTO task (title, description, category_id, is_completed, to_buy, expected_amount, reminder_date, started_at, ended_at, created_at, updated_at, deleted_at)
          VALUES 
            ('Create a task', '', 1, 0, 0, 0, ${todayUnix}, null, null, null, null, null),
            ('Create a journal', '', 1, 0, 0, 0, ${todayUnix}, null, null, null, null, null),
            ('Create an expense', '', 1, 0, 0, 0, ${todayUnix}, null, null, null, null, null),
            ('Set a monthly budget', '', 1, 0, 0, 0, ${todayUnix}, null, null, null, null, null)
            ;
        `,
      },
    ],
  },
] satisfies Migration[];
