import { Expense } from '@/hooks/services/expense/expense.types';

export function getTotalExpenseAmount(expenses?: Pick<Expense, 'amount'>[] | null) {
  if (!expenses) return 0;

  return expenses.reduce((total, expense) => total + expense.amount, 0);
}
