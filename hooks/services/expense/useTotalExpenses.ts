import { useQuery } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { ExpenseQueryKeys } from './expense.types';
import dayjs from 'dayjs';
import { GlobalSnackbar } from '@/managers/SnackbarManager';

type Variables = {
  $start: string;
  $end: string;
};

type ReturnData = {
  total_expenses: number;
};

type UseTotalExpensesParams = {
  transactionDate: Date;
};

export function useTotalExpenses({ transactionDate }: UseTotalExpensesParams) {
  const db = useSQLiteContext();

  return useQuery<number>({
    queryKey: [ExpenseQueryKeys.totalExpenses],
    queryFn: async () => {
      const query = buildQuery();
      const variables = buildVariables(transactionDate);

      try {
        const result = await db.getFirstAsync<ReturnData>(query, variables);
        return result?.total_expenses ?? 0;
      } catch (e) {
        GlobalSnackbar.show({
          message: 'An error occurred while fetching total expenses',
          type: 'error',
        });
        throw e;
      }
    },
    initialData: 0,
  });
}

function buildQuery() {
  return GET_TOTAL_MONTHLY_EXPENSES;
}

function buildVariables(date: Date): Variables {
  const dayjsDate = dayjs(date);

  return {
    $start: dayjsDate.startOf('month').unix().toString(),
    $end: dayjsDate.endOf('month').unix().toString(),
  };
}

const GET_TOTAL_MONTHLY_EXPENSES = /* sql */ `
  SELECT SUM(amount) as total_expenses
  FROM expense
  WHERE (
    transaction_date BETWEEN $start AND $end
    AND recurrence IS NULL
  )
`;
