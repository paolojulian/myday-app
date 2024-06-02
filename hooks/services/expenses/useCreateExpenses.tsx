import useMutation from '../useMutation';
import { useSQLiteContext } from 'expo-sqlite';

//TODO
const useCreateExpense = (expense: Expense) => {
  const db = useSQLiteContext();

  async function createExpense() {
    const result = await db.runAsync(
      'INSERT INTO Expense (amount, description) VALUES (?, ?)',
      expense.description,
      expense.amount,
    );
    return result;
  }

  return useMutation(createExpense);
};

export default useCreateExpense;
