import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSQLiteContext } from 'expo-sqlite';
import { ExpenseQueryKeys } from './expense.types';

type Variables = {
  $start: string;
  $end: string;
};

type ReturnData = {
  total_expenses: number;
};

type UseTotalExpensesParams = {
  transactionDate: Date;
  type?: 'daily' | 'monthly';
};

export function useTotalExpenses({ transactionDate, type = 'monthly' }: UseTotalExpensesParams) {
  const db = useSQLiteContext();

  return useQuery<number>({
    queryKey: [ExpenseQueryKeys.totalExpenses, type],
    queryFn: async () => {
      const query = buildQuery();
      const variables = buildVariables({ transactionDate, type });

      try {
        const result = await db.getFirstAsync<ReturnData>(query, variables);
        return result?.total_expenses ?? 0;
      } catch (e) {
        console.error(e);
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

function buildVariables({ transactionDate, type }: UseTotalExpensesParams): Variables {
  const dayjsDate = dayjs(transactionDate);
  if (type === 'monthly') {
    return {
      $start: dayjsDate.startOf('month').unix().toString(),
      $end: dayjsDate.endOf('month').unix().toString(),
    };
  }
  if (type === 'daily') {
    return {
      $start: dayjsDate.startOf('day').unix().toString(),
      $end: dayjsDate.endOf('day').unix().toString(),
    };
  }

  throw new Error('Invalid type: ', type);
}

const GET_TOTAL_MONTHLY_EXPENSES = /* sql */ `
  SELECT SUM(amount) as total_expenses
  FROM expense
  WHERE (
    transaction_date BETWEEN $start AND $end
    AND recurrence IS NULL
  )
`;
