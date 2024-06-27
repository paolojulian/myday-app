import {
  RecurringExpense,
  RecurringExpenses,
} from '@/providers/DatabaseProvider/utils/runRecurringExpenses.util';
import dayjs from 'dayjs';

const now = dayjs();
const mockRecurringExpense = {
  amount: 1700,
  category_id: 3,
  created_at: now.unix(),
  deleted_at: null,
  description: 'PLDT',
  id: 1,
  latest_recurred_transaction_date: dayjs(now).subtract(4, 'months').subtract(2, 'days').unix(),
  recurrence: 'monthly',
  recurrence_id: null,
  title: 'Internet',
  transaction_date: dayjs(now).subtract(4, 'months').unix(),
  updated_at: now.unix(),
} satisfies RecurringExpense;

describe('TESTING RecurringExpenses class', () => {
  describe('GIVEN a monthly recurring expense', () => {
    describe('WHEN the app has not been opened for 4 months, but there is a recurred expense 4 months and 3 days ago', () => {
      const mockExecuteAsync = jest.fn();
      const recurringExpense = { ...mockRecurringExpense };

      const mockDb = {
        getAllAsync: jest.fn(async () => [mockRecurringExpense]),
        prepareAsync: async () =>
          ({
            executeAsync: mockExecuteAsync,
            finalizeAsync: jest.fn(),
          }) as any,
      } as any;

      beforeEach(async () => {
        await new RecurringExpenses(mockDb, now).populate();
      });

      afterEach(() => {
        mockExecuteAsync.mockClear();
      });

      it('THEN it should create 4 recurred expense', async () => {
        const expectedTransactionDates = [
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(1, 'month')
            .unix(),
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(2, 'months')
            .unix(),
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(3, 'months')
            .unix(),
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(4, 'months')
            .unix(),
        ];

        expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
        mockExecuteAsync.mock.calls.forEach((callArgs, index) => {
          expect(callArgs).toEqual([
            expect.objectContaining({
              $amount: recurringExpense.amount,
              $category_id: recurringExpense.category_id,
              $description: recurringExpense.description,
              $title: recurringExpense.title,
              $transaction_date: expectedTransactionDates[index],
            }),
          ]);
        });
      });
    });

    describe('WHEN the app has not been opened for 4 months and there is no recurred expense yet', () => {
      const now = dayjs();
      const recurringExpense = {
        ...mockRecurringExpense,
        latest_recurred_transaction_date: null,
      } satisfies RecurringExpense;

      const mockExecuteAsync = jest.fn();

      const mockDb = {
        getAllAsync: jest.fn(async () => [recurringExpense]),
        prepareAsync: async () =>
          ({
            executeAsync: mockExecuteAsync,
            finalizeAsync: jest.fn(),
          }) as any,
      } as any;

      beforeEach(async () => {
        await new RecurringExpenses(mockDb, now).populate();
      });

      afterEach(() => {
        mockExecuteAsync.mockClear();
      });

      it('THEN it should create 4 recurred expense', () => {
        const expectedTransactionDates = [
          dayjs.unix(recurringExpense.transaction_date).startOf('day').add(1, 'month').unix(),
          dayjs.unix(recurringExpense.transaction_date).startOf('day').add(2, 'months').unix(),
          dayjs.unix(recurringExpense.transaction_date).startOf('day').add(3, 'months').unix(),
          dayjs.unix(recurringExpense.transaction_date).startOf('day').add(4, 'months').unix(),
        ];

        expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
        mockExecuteAsync.mock.calls.forEach((callArgs, index) => {
          expect(callArgs).toEqual([
            expect.objectContaining({
              $amount: recurringExpense.amount,
              $category_id: recurringExpense.category_id,
              $description: recurringExpense.description,
              $title: recurringExpense.title,
              $transaction_date: expectedTransactionDates[index],
            }),
          ]);
        });
      });
    });

    describe('WHEN the app has not been opened for 4 months and there is a recurred expense exactly 4 months ago', () => {
      const now = dayjs();
      const recurringExpense = {
        ...mockRecurringExpense,
      } satisfies RecurringExpense;

      const mockExecuteAsync = jest.fn();

      const mockDb = {
        getAllAsync: jest.fn(async () => [recurringExpense]),
        prepareAsync: async () =>
          ({
            executeAsync: mockExecuteAsync,
            finalizeAsync: jest.fn(),
          }) as any,
      } as any;

      beforeEach(async () => {
        await new RecurringExpenses(mockDb, now).populate();
      });

      afterEach(() => {
        mockExecuteAsync.mockClear();
      });

      it('THEN it should create 4 recurred expense', async () => {
        const expectedTransactionDates = [
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(1, 'month')
            .unix(),
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(2, 'months')
            .unix(),
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(3, 'months')
            .unix(),
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(4, 'months')
            .unix(),
        ];

        expect(mockExecuteAsync).toHaveBeenCalledTimes(4);
        mockExecuteAsync.mock.calls.forEach((callArgs, index) => {
          expect(callArgs).toEqual([
            expect.objectContaining({
              $amount: recurringExpense.amount,
              $category_id: recurringExpense.category_id,
              $description: recurringExpense.description,
              $title: recurringExpense.title,
              $transaction_date: expectedTransactionDates[index],
            }),
          ]);
        });
      });
    });

    describe('WHEN the app has not been opened for 4 months and there is a recurred expense 3 and a half months ago', () => {
      const now = dayjs();
      const recurringExpense = {
        ...mockRecurringExpense,
        latest_recurred_transaction_date: dayjs(now).subtract(4, 'months').add(15, 'days').unix(),
      } satisfies RecurringExpense;

      const mockExecuteAsync = jest.fn();

      const mockDb = {
        getAllAsync: jest.fn(async () => [recurringExpense]),
        prepareAsync: async () =>
          ({
            executeAsync: mockExecuteAsync,
            finalizeAsync: jest.fn(),
          }) as any,
      } as any;

      beforeEach(async () => {
        await new RecurringExpenses(mockDb, now).populate();
      });

      afterEach(() => {
        mockExecuteAsync.mockClear();
      });

      it('THEN it should create 3 recurred expense', async () => {
        const expectedTransactionDates = [
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(1, 'month')
            .unix(),
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(2, 'months')
            .unix(),
          dayjs
            .unix(recurringExpense.latest_recurred_transaction_date)
            .startOf('day')
            .add(3, 'months')
            .unix(),
        ];

        expect(mockExecuteAsync).toHaveBeenCalledTimes(3);
        mockExecuteAsync.mock.calls.forEach((callArgs, index) => {
          expect(callArgs).toEqual([
            expect.objectContaining({
              $amount: recurringExpense.amount,
              $category_id: recurringExpense.category_id,
              $description: recurringExpense.description,
              $title: recurringExpense.title,
              $transaction_date: expectedTransactionDates[index],
            }),
          ]);
        });
      });
    });

    describe('WHEN the app has been opened and there is a consistent recurred expense', () => {
      const mockExecuteAsync = jest.fn();

      const mockDb = {
        getAllAsync: jest.fn(async () => []),
        prepareAsync: async () =>
          ({
            executeAsync: mockExecuteAsync,
            finalizeAsync: jest.fn(),
          }) as any,
      } as any;

      beforeEach(async () => {
        await new RecurringExpenses(mockDb, now).populate();
      });

      afterEach(() => {
        mockExecuteAsync.mockClear();
      });
      it('THEN it should not create any recurred expense', async () => {
        expect(mockExecuteAsync).not.toHaveBeenCalled();
      });
    });

    describe('GIVEN multiple recurring expenses', () => {
      const mockExecuteAsync = jest.fn();
      const recurringExpense1 = {
        ...mockRecurringExpense,
        id: 1,
        latest_recurred_transaction_date: dayjs(now)
          .subtract(4, 'months')
          .subtract(2, 'days')
          .unix(),
        transaction_date: dayjs(now).subtract(4, 'months').unix(),
      } satisfies RecurringExpense;
      const recurringExpense2 = {
        ...mockRecurringExpense,
        id: 2,
        latest_recurred_transaction_date: null,
        transaction_date: dayjs(now).subtract(1, 'month').unix(),
      } satisfies RecurringExpense;

      const mockDb = {
        getAllAsync: jest.fn(async () => [recurringExpense1, recurringExpense2]),
        prepareAsync: async () =>
          ({
            executeAsync: mockExecuteAsync,
            finalizeAsync: jest.fn(),
          }) as any,
      } as any;
      beforeEach(async () => {
        await new RecurringExpenses(mockDb, now).populate();
      });
      afterEach(() => {
        jest.clearAllMocks();
      });
      it('THEN it should create 4 recurred expense for recurringExpense1 and 1 recurred expense for recurringExpense2', async () => {
        expect(mockExecuteAsync).toHaveBeenCalledTimes(5);
        expect(mockExecuteAsync).toHaveBeenNthCalledWith(
          1,
          expect.objectContaining({
            $transaction_date: dayjs
              .unix(recurringExpense1.latest_recurred_transaction_date)
              .startOf('day')
              .add(1, 'month')
              .unix(),
          }),
        );
        expect(mockExecuteAsync).toHaveBeenNthCalledWith(
          2,
          expect.objectContaining({
            $transaction_date: dayjs
              .unix(recurringExpense2.transaction_date)
              .startOf('day')
              .add(1, 'month')
              .unix(),
          }),
        );
        expect(mockExecuteAsync).toHaveBeenNthCalledWith(
          3,
          expect.objectContaining({
            $transaction_date: dayjs
              .unix(recurringExpense1.latest_recurred_transaction_date)
              .startOf('day')
              .add(2, 'months')
              .unix(),
          }),
        );
      });
    });
  });
});
