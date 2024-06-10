import { useSQLiteContext } from 'expo-sqlite';
import useQuery from '../useQuery';
import { filtersToString } from '@/hooks/utils';

const useCategory = (filters: Filter[]) => {
  const db = useSQLiteContext();
  const { data, isLoading, error } = useQuery(setup);

  async function setup() {
    const { whereString, values } = filtersToString(filters);
    const result = await db.getAllAsync<Expense>('SELECT * FROM category ' + whereString, values);
    return result;
  }

  return { data, isLoading, error };
};

export default useCategory;
