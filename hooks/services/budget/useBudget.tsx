import { Budget } from '@/hooks/services/budget/budget.types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSQLiteContext } from 'expo-sqlite';

const useBudget = (date: Date = new Date()) => {
  const db = useSQLiteContext();

  const getBudgetByDateMonth = async () => {
    const result = await db.getFirstAsync<Budget>(GET_BUDGET_BY_DATE_MONTH_QUERY, {
      $lastDayOfMonth: dayjs(date).endOf('month').unix().toString(),
    });
    return result;
  };

  return useQuery({
    queryKey: ['budget', date],
    queryFn: getBudgetByDateMonth,
  });
};

export default useBudget;

const GET_BUDGET_BY_DATE_MONTH_QUERY = `
  SELECT * FROM Budget WHERE created_at <= $lastDayOfMonth ORDER BY created_at DESC LIMIT 1;
`;
