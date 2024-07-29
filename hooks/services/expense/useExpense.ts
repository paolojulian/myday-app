import { useQuery } from '@tanstack/react-query';
import { Expense, ExpenseQueryKeys } from './expense.types';
import { useSQLiteContext } from 'expo-sqlite';

export function useExpense(id: number) {
  const db = useSQLiteContext();

  const queryFn = async () => {
    const result = await db.getFirstAsync<Expense>(GET_EXPENSE_BY_ID, {
      $id: id,
    });

    return result;
  };

  return useQuery({
    queryKey: getUseExpenseQueryKey(id),
    queryFn,
  });
}

const GET_EXPENSE_BY_ID = /* sql */ `
  SELECT expense.* FROM expense
  WHERE id = $id
`;

export const getUseExpenseQueryKey: (id: number) => (string | number)[] = id => [
  ExpenseQueryKeys.expense,
  ExpenseQueryKeys.item,
  id,
];
