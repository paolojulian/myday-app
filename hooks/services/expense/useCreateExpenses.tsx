import { Expense } from '@/hooks/services/expense/expense.types';
import { useSQLiteContext } from 'expo-sqlite';
import useMutation from '../useMutation';

const useCreateExpense = () => {
  const db = useSQLiteContext();
  const { data, isLoading, error, mutate } = useMutation(setup);

  async function setup(expense: Expense) {
    const result = await db.runAsync(
      'INSERT INTO Expense (amount, description) VALUES (?, ?)',
      expense.description,
      expense.amount,
    );
    return result;
  }

  return { data, isLoading, error, mutate };
};

export default useCreateExpense;
