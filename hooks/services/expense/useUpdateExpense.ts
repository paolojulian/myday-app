import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { Expense, ExpenseQueryKeys } from './expense.types';
import { getUseExpenseQueryKey } from './useExpense';
import { addVariableIfDefined } from '@/utils/add-variable-if-defined';

type SupportedUpdateExpenseFields = Partial<
  Pick<
    Expense,
    'title' | 'transaction_date' | 'amount' | 'description' | 'category_id' | 'recurrence'
  >
>;

export function useUpdateExpense(id: Expense['id']) {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: SupportedUpdateExpenseFields) => {
      const statement = buildStatement(expense);
      let variables = {
        $id: id,
      } as any;

      addVariableIfDefined(variables, 'title', expense?.title);
      addVariableIfDefined(variables, 'amount', expense?.amount);
      addVariableIfDefined(variables, 'category_id', expense?.category_id);
      addVariableIfDefined(variables, 'transaction_date', expense?.transaction_date);
      addVariableIfDefined(variables, 'description', expense?.description);
      addVariableIfDefined(variables, 'recurrence', expense?.recurrence);

      await db.runAsync(statement, variables);
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

const buildStatement = (expense: SupportedUpdateExpenseFields) => {
  const setClauses = Object.keys(expense).map(key => `${key} = $${key}`);
  const setStatement = setClauses.join(', ');

  return /* sql */ `
    UPDATE Expense
    SET ${setStatement}
    WHERE id = $id
  `;
};
