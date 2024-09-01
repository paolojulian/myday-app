import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { Expense, ExpenseQueryKeys } from './expense.types';
import { getUseExpenseQueryKey } from './useExpense';
import { EditExpenseFormValues } from '@/components/expenses/EditExpenseScreen/EditExpenseForm/EditExpenseForm.utils';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { Category } from '../category/category.types';

type SupportedUpdateExpenseFields = EditExpenseFormValues & {
  categoryId: Category['id'] | null;
};

export function useUpdateExpense(id: Expense['id']) {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: SupportedUpdateExpenseFields) => {
      const resolvedTransactionDate = expense.transactionDate
        ? convertDateToEpoch(expense.transactionDate)
        : null;

      const nowEpoch = Date.now();
      const variables = {
        $id: id,
        $title: expense.title,
        $amount: expense.amount,
        $category_id: expense.categoryId,
        $transaction_date: resolvedTransactionDate,
        $description: expense.description ?? null,
        $recurrence: expense.recurrence,
        $updated_at: nowEpoch,
      };
      const statement = buildStatement();

      const result = await db.runAsync(statement, variables);

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          if (query.queryKey === getUseExpenseQueryKey(id)) {
            return true;
          }

          return query.queryKey[0] === ExpenseQueryKeys.expense;
        },
      });
    },
  });
}

const buildStatement = () => {
  return /* sql */ `
    UPDATE Expense
    SET
      title = $title,
      amount = $amount,
      category_id = $category_id,
      transaction_date = $transaction_date,
      description = $description,
      recurrence = $recurrence,
      updated_at = $updated_at
    WHERE id = $id
  `;
};
