import { useSQLiteContext } from 'expo-sqlite';
import { Expense, ExpenseQueryKeys } from './expense.types';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { BudgetQueryKeys } from '../budget/budget.types';

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
          if (typeof query.queryKey[0] !== 'string') return false;

          const queriesToCancel: string[] = [
            ExpenseQueryKeys.list,
            ExpenseQueryKeys.recurringExpenses,
            BudgetQueryKeys.budget,
          ];

          return queriesToCancel.includes(query.queryKey[0]);
        },
      });
    },
  });
}

const DELETE_EXPENSE_ITEM_STATEMENT = /* sql */ `
  DELETE FROM expense
  WHERE id = $id
`;
