import { OTHERS_CATEGORY_ID } from '@/database/migrations/category';
import { Expense, ExpenseQueryKeys } from '@/hooks/services/expense/expense.types';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSQLiteContext } from 'expo-sqlite';

export type SupportedCreateExpenseFields = Pick<
  Expense,
  'title' | 'transaction_date' | 'amount' | 'description' | 'category_id' | 'recurrence'
>;

export const useCreateExpense = () => {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  async function setup(expense: SupportedCreateExpenseFields) {
    const now_epoch = convertDateToEpoch(new Date());
    const variables = {
      $title: expense.title,
      $amount: expense.amount,
      $description: expense.description,
      $category_id: expense.category_id ?? OTHERS_CATEGORY_ID,
      $transaction_date: expense.transaction_date,
      $recurrence: expense.recurrence,
      $recurrence_id: null,
      $created_at: now_epoch,
      $updated_at: now_epoch,
    };

    try {
      await db.withTransactionAsync(async () => {
        const result = await db.runAsync(ADD_EXPENSE_STATEMENT, variables);

        const isExpenseToday = dayjs.unix(expense.transaction_date).isSame(dayjs(), 'day');
        if (expense.recurrence !== null && !!isExpenseToday) {
          // Add recurrence
          await db.runAsync(ADD_EXPENSE_STATEMENT, {
            ...variables,
            $recurrence_id: result.lastInsertRowId,
            $recurrence: null,
          });
        }
      });
    } catch (e) {
      if (e instanceof Error) {
        GlobalSnackbar.show({
          message: e.message,
          type: 'error',
        });
      }
    }
  }

  const { data, error, mutate, mutateAsync, isPending } = useMutation({
    mutationFn: setup,
    onSuccess: response => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === ExpenseQueryKeys.expense,
      });

      return response;
    },
  });

  return { data, isLoading: isPending, error, mutate, mutateAsync };
};

export const ADD_EXPENSE_STATEMENT = `
  INSERT INTO Expense (title, amount, description, category_id, transaction_date, recurrence, recurrence_id, created_at, updated_at)
  VALUES ($title, $amount, $description, $category_id, $transaction_date, $recurrence, $recurrence_id,$created_at, $updated_at)
`;
