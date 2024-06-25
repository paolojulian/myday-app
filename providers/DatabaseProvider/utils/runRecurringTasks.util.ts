import { Task } from '@/hooks/services/task/task.types';
import dayjs, { type Dayjs } from 'dayjs';
import { type SQLiteDatabase } from 'expo-sqlite';

export type RecurringTask = Task & { latest_recurred_reminder_date: number };
const MAX_TASKS = 3;

export class RecurringTasks {
  private db: SQLiteDatabase;
  private now: Dayjs;

  constructor(db: SQLiteDatabase, now?: Dayjs) {
    this.db = db;
    this.now = now || dayjs();
  }

  async populate() {
    const recurringExpenses = await this.db.getAllAsync<RecurringTask>(GET_LATEST_RECURRING_TASKS);
    recurringExpenses.forEach(expense => {
      this.processRecurringTask(expense);
    });
  }

  private async processRecurringTask(recurringTask: RecurringTask) {
    switch (recurringTask.recurrence_type) {
      case 'daily':
        this.processRecurringTaskByInterval(recurringTask, 'days');
        break;
      case 'weekly':
        this.processRecurringTaskByInterval(recurringTask, 'weeks');
        break;
      case 'monthly':
        this.processRecurringTaskByInterval(recurringTask, 'months');
        break;
      case 'yearly':
        this.processRecurringTaskByInterval(recurringTask, 'years');
        break;
      default:
    }
  }

  private async processRecurringTaskByInterval(
    recurringTask: RecurringTask,
    interval: 'days' | 'weeks' | 'months' | 'years',
  ) {
    const latestRecurredReminderDate = dayjs.unix(
      recurringTask.latest_recurred_reminder_date ?? recurringTask.reminder_date,
    );
    const timePassed = this.now.diff(latestRecurredReminderDate, interval);
    const tasksToCreate = Math.min(timePassed, MAX_TASKS);

    const addRecurringTaskStatement = await this.db.prepareAsync(ADD_RECURRED_TASK);
    try {
      for (let i = 1; i <= tasksToCreate; i++) {
        await addRecurringTaskStatement.executeAsync({
          $title: recurringTask.title,
          $description: recurringTask.description,
          $category_id: recurringTask.category_id,
          $reminder_date: dayjs(latestRecurredReminderDate).add(i, interval).startOf('day').unix(),
          $recurrence_id: recurringTask.id,
          $created_at: this.now.unix(),
          $updated_at: this.now.unix(),
        });
      }
    } catch (e: any) {
      throw new Error('Failed to add recurring expenses: ' + e.message);
    } finally {
      await addRecurringTaskStatement.finalizeAsync();
      console.log('Successfully added recurring expenses.');
    }
  }
}

const ADD_RECURRED_TASK = /* sql */ `
  INSERT INTO task (title, description, category_id, is_completed, to_buy, expected_amount, reminder_date, recurrence_id, created_at, updated_at)
  VALUES ($title, $description, $category_id, $is_completed, $to_buy, $expected_amount, $reminder_date, $recurrence_id, $created_at, $updated_at);
`;

const GET_LATEST_RECURRING_TASKS = /* sql */ `
  SELECT parent_task.*, MAX(recurred_task.reminder_date) as latest_recurred_reminder_date
  FROM task parent_task
  LEFT JOIN task recurred_task ON parent_task.id = recurred_task.recurrence_id
  WHERE parent_task.recurrence_type IS NOT NULL
    AND parent_task.is_complete = 0
  GROUP BY parent_task.id;
`;
