import { Expense, ExpenseQueryKeys } from '@/hooks/services/expense/expense.types';
import { useSQLiteContext } from 'expo-sqlite';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export type SupportedCreateExpenseFields = Pick<
  Expense,
  'title' | 'transaction_date' | 'amount' | 'description' | 'category_id'
>;

export const useCreateExpense = () => {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  async function setup(expense: SupportedCreateExpenseFields) {
    const now_epoch = convertDateToEpoch(new Date());
    const result = await db.runAsync(ADD_EXPENSE_STATEMENT, {
      $title: expense.title,
      $amount: expense.amount,
      $description: expense.description,
      $category_id: expense.category_id,
      $transaction_date: expense.transaction_date,
      $created_at: now_epoch,
      $updated_at: now_epoch,
    });

    return result;
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
  INSERT INTO Expense (title, amount, description, category_id, transaction_date, created_at, updated_at)
  VALUES ($title, $amount, $description, $category_id, $transaction_date, $created_at, $updated_at)
`;
