import { useSQLiteContext } from 'expo-sqlite';
import useQuery from '../useQuery';

const useExpense = (filters: Filter[]) => {
  const db = useSQLiteContext();
  const { data, isLoading, error } = useQuery(setup);

  async function setup() {
    const { whereString, values } = filtersToString(filters);
    const result = await db.getAllAsync<Expense>('SELECT * FROM expense ' + whereString, values);
    return result;
  }

  return { data, isLoading, error };
};

const filtersToString = (filters: Filter[]) => {
  if (filters.length < 1) {
    return { whereString: '', values: [] };
  }

  let whereString = 'WHERE ';
  let values: string[] = [];
  filters.forEach(element => {
    whereString += element.columnName + ' ' + element.condition + '?';
    values.push(element.value);
  });

  return { whereString, values };
};

export default useExpense;
