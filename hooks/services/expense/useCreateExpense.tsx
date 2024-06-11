import { Expense } from '@/hooks/services/expense/expense.types';
import { useSQLiteContext } from 'expo-sqlite';
import useMutation from '../useMutation';
import { useCallback } from 'react';

const useCreateExpense = () => {
  const db = useSQLiteContext();

  const setup = useCallback(
    async (expense: Expense) => {
      const result = await db.runAsync(
        'INSERT INTO expense (amount, description) VALUES (?, ?)',
        expense.description,
        expense.amount,
      );
      return result;
    },
    [db],
  );

  return useMutation(setup);
};

export default useCreateExpense;
