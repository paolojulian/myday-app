import { useSQLiteContext } from 'expo-sqlite';
import { filtersToString } from '@/hooks/utils';
import { useQuery } from '@tanstack/react-query';
import { Expense, ExpenseQueryKeys } from '@/hooks/services/expense/expense.types';
import { Filter } from '@/hooks/services/filter.types';

const useExpense = (filters: Filter[] = []) => {
  const db = useSQLiteContext();

  async function setup() {
    const { whereString, values } = filtersToString(filters);
    const result = await db.getAllAsync<Expense>('SELECT * FROM expense ' + whereString, values);
    return result;
  }

  return useQuery({
    queryKey: [ExpenseQueryKeys.list],
    queryFn: setup,
  });
};

export default useExpense;
