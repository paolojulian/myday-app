import { useQuery } from '@tanstack/react-query';
import { Expense, ExpenseQueryKeys } from './expense.types';
import { useSQLiteContext } from 'expo-sqlite';
import dayjs from 'dayjs';

export function useExpenseRecurredPayments(id: number, filterDate: Date) {
  const db = useSQLiteContext();

  const queryFn = async () => {
    const variables = buildVariables(id, filterDate);
    const result = await db.getAllAsync<Expense>(GET_RECCURED_EXPENSES_BY_ID, variables);

    return result;
  };

  return useQuery({
    queryKey: [ExpenseQueryKeys.recurrenceItems, id, dayjs(filterDate).format('YYYY-MM-DD')],
    queryFn,
  });
}

function buildVariables(id: number, filterDate: Date) {
  return {
    $id: id,
    $startDate: dayjs(filterDate).startOf('month').unix(),
    $endDate: dayjs(filterDate).endOf('month').unix(),
  };
}

const GET_RECCURED_EXPENSES_BY_ID = /* sql */ `
  SELECT expense.* FROM expense
  WHERE recurrence_id = $id
    AND transaction_date BETWEEN $startDate AND $endDate
  ORDER BY transaction_date DESC
  LIMIT 20
`;
