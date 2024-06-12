import {
  Expense,
  ExpenseFilterEnum,
  ExpenseQueryFilters,
  ExpenseQueryKeys,
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

async function fetchExpense(db: SQLiteDatabase, filters?: ExpenseQueryFilters): Promise<Expense[]> {
  if (!filters) {
    return await db.getAllAsync<Expense>('SELECT * FROM expense');
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

  return await db.getAllAsync<Expense>(
    'SELECT * FROM expense WHERE transaction_date BETWEEN $start AND $end',
    filterFunctions[filterType](),
  );
}

export default useExpense;
