import {
  type RecurringTask,
  RecurringTasks,
} from '@/providers/DatabaseProvider/utils/runRecurringTasks.util';
import dayjs from 'dayjs';

describe('TESTING runRecurringTasks.util.ts', () => {
  describe('GIVEN database and time', () => {
    const now = dayjs(new Date());
    const recurringTask = {
      category_id: 1,
      created_at: now.unix(),
      deleted_at: null,
      description: 'description',
      ended_at: null,
      expected_amount: null,
      id: 1,
      is_completed: 0,
      latest_recurred_reminder_date: dayjs(now)
        .subtract(12, 'month')
        .subtract(2, 'days')
        .startOf('day')
        .unix(),
      recurrence_days: null,
      recurrence_id: null,
      recurrence_type: 'monthly',
      reminder_date: 1,
      started_at: null,
      title: 'title',
      to_buy: 0,
      updated_at: now.unix(),
    } satisfies RecurringTask;
    const mockExecuteAsync = jest.fn();
    const db = {
      getAllAsync: jest.fn(async () => [recurringTask]),
      prepareAsync: async () =>
        ({
          executeAsync: mockExecuteAsync,
          finalizeAsync: jest.fn(),
        }) as any,
    } as any;

    describe('WHEN RecurringTasks is instantiated', () => {
      it('THEN it should have a db and now property', () => {
        const recurringTasks = new RecurringTasks(db, now);
        expect(recurringTasks).toHaveProperty('db', db);
        expect(recurringTasks).toHaveProperty('now', now);
      });
    });

    describe('WHEN populate is called', () => {
      let recurringTasks: RecurringTasks;
      beforeEach(async () => {
        jest.clearAllMocks();
        recurringTasks = new RecurringTasks(db, now);
        await recurringTasks.populate();
      });

      it('THEN it should call db.getAllAsync', async () => {
        expect(db.getAllAsync).toHaveBeenCalled();
      });

      it.only('THEN it should call processRecurringExpense for each recurring task', async () => {
        expect(mockExecuteAsync).toHaveBeenCalledTimes(3);
        expect(mockExecuteAsync).toHaveBeenCalledWith(
          expect.objectContaining({
            $reminder_date: dayjs
              .unix(recurringTask.latest_recurred_reminder_date)
              .add(11, 'months')
              .unix(),
          }),
        );
      });
    });
  });
});
