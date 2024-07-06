import { useMemo } from 'react';
import useExpenses from './useExpenses';

export function useTotalMonthlyExpenses() {
  const today = useMemo(() => new Date(), []);
  const { data: expenses } = useExpenses({
    filterType: 'monthly',
    transactionDate: today,
  });

  return expenses?.reduce((total, expense) => total + expense.amount, 0) ?? 0;
}
