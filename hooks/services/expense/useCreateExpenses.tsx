import { Expense, ExpenseQueryKeys } from '@/hooks/services/expense/expense.types';
import { useSQLiteContext } from 'expo-sqlite';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { GlobalSnackbar } from '@/managers/SnackbarManager';

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
      $category_id: expense.category_id,
      $transaction_date: expense.transaction_date,
      $recurrence: expense.recurrence,
      $created_at: now_epoch,
      $updated_at: now_epoch,
    };

    try {
      await db.withTransactionAsync(async () => {
        await db.runAsync(ADD_EXPENSE_STATEMENT, variables);

        if (expense.recurrence !== null) {
          // Add recurrence
          await db.runAsync(ADD_EXPENSE_STATEMENT, {
            ...variables,
            recurrence: null,
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

  const { data, error, mutate, isPending } = useMutation({
    mutationFn: setup,
    onSuccess: response => {
      queryClient.invalidateQueries({
        predicate(query) {
          return query.queryKey[0] === ExpenseQueryKeys.list;
        },
      });

      return response;
    },
  });

  return { data, isLoading: isPending, error, mutate };
};

const ADD_EXPENSE_STATEMENT = `
  INSERT INTO Expense (title, amount, description, category_id, transaction_date, recurrence, created_at, updated_at)
  VALUES ($title, $amount, $description, $category_id, $transaction_date, $recurrence, $created_at, $updated_at)
`;
