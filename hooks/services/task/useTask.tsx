import { useSQLiteContext } from 'expo-sqlite';
import useQuery from '../useQuery';
import { filtersToString } from '@/hooks/utils';
import { Filter } from '../filter.types';
import { Expense } from '../expense/expense.types';

const useTask = (filters: Filter[]) => {
  const db = useSQLiteContext();
  const { data, isLoading, error } = useQuery(setup);

  async function setup() {
    const { whereString, values } = filtersToString(filters);
    const result = await db.getAllAsync<Expense>('SELECT * FROM task ' + whereString, values);
    return result;
  }

  return { data, isLoading, error };
};

export default useTask;
