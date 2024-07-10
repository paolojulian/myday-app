import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { Expense, ExpenseQueryKeys } from './expense.types';
import { BudgetQueryKeys } from '../budget/budget.types';

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

      await db.runAsync(statement, variables);
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
          const includesId = queriesToCancel.includes(query.queryKey[0]);

          const itemQueryToCancel =
            query.queryKey[0] === ExpenseQueryKeys.item && query.queryKey[1] === id;

          return includesId || itemQueryToCancel;
        },
      });
    },
  });
}

function addVariableIfDefined<T>(
  variables: Record<string, T>,
  fieldName: keyof Expense,
  value?: T,
) {
  if (!value) return;

  variables[`$${fieldName}`] = value;
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
