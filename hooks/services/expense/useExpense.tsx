import {
  ExpenseFilterEnum,
  ExpenseQueryFilters,
  ExpenseQueryKeys,
  ExpenseWithCategoryName,
} from '@/hooks/services/expense/expense.types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { SQLiteDatabase, useSQLiteContext } from 'expo-sqlite';
import { useCallback } from 'react';

const useExpense = (filters?: ExpenseQueryFilters) => {
  const db = useSQLiteContext();

  const setup = useCallback(async () => {
    return fetchExpense(db, filters);
  }, [db, filters]);

  return useQuery({
    queryKey: [ExpenseQueryKeys.list, filters?.filterType, filters?.transactionDate],
    queryFn: setup,
  });
};

async function fetchExpense(
  db: SQLiteDatabase,
  filters?: ExpenseQueryFilters,
): Promise<ExpenseWithCategoryName[]> {
  if (!filters) {
    return await db.getAllAsync<ExpenseWithCategoryName>(BASE_GET_EXPENSES_STATEMENT);
  }

  const { filterType, transactionDate } = filters;

  const filterFunctions: Record<ExpenseFilterEnum, () => { $start: string; $end: string }> = {
    [ExpenseFilterEnum.daily]: () => ({
      $start: dayjs(transactionDate).startOf('day').unix().toString(),
      $end: dayjs(transactionDate).endOf('day').unix().toString(),
    }),
    [ExpenseFilterEnum.monthly]: () => ({
      $start: dayjs(transactionDate).startOf('month').unix().toString(),
      $end: dayjs(transactionDate).endOf('month').unix().toString(),
    }),
    [ExpenseFilterEnum.yearly]: () => ({
      $start: dayjs(transactionDate).startOf('year').unix().toString(),
      $end: dayjs(transactionDate).endOf('year').unix().toString(),
    }),
  };
  if (!filterFunctions[filterType]) {
    throw new Error(`Invalid filter type: ${filterType}`);
  }

  return await db.getAllAsync<ExpenseWithCategoryName>(
    GET_FILTERED_EXPENSES_STATEMENT,
    filterFunctions[filterType](),
  );
}

const BASE_GET_EXPENSES_STATEMENT = `
  SELECT expense.*, category.category_name as category_name FROM expense
  LEFT JOIN category ON expense.category_id = category.id
`;

const GET_FILTERED_EXPENSES_STATEMENT = `
  ${BASE_GET_EXPENSES_STATEMENT}
  WHERE expense.transaction_date BETWEEN $start AND $end
`;

export default useExpense;
