import { ExpenseListItem } from '@/hooks/services/expense/expense.types';
import RecurringExpenseItem from './RecurringExpenseItem';
import ExpenseItem from './ExpenseItem';

type SupportedExpenseFields = Pick<
  ExpenseListItem,
  'id' | 'title' | 'amount' | 'transaction_date' | 'category_name' | 'category_id' | 'recurrence'
>;

type ExpenseItemProps = {
  expense: SupportedExpenseFields;
};

export default function ExpenseItemFactory({ expense }: ExpenseItemProps) {
  const { recurrence } = expense;

  if (recurrence !== null) {
    return <RecurringExpenseItem expense={expense} />;
  }

  return <ExpenseItem expense={expense} />;
}
