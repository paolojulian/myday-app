import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { Expense, ExpenseQueryKeys } from './expense.types';
import { getUseExpenseQueryKey } from './useExpense';

export function useDeleteExpense(id: Expense['id']) {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      return await db.runAsync(DELETE_EXPENSE_ITEM_STATEMENT, { $id: id });
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

const DELETE_EXPENSE_ITEM_STATEMENT = /* sql */ `
  DELETE FROM expense
  WHERE id = $id
`;
