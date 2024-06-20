import Container from '@/components/common/Container';
import { Expense } from '@/hooks/services/expense/expense.types';
import useExpense from '@/hooks/services/expense/useExpense';
import ExpenseItem from './ExpensesListItem/ExpenseItem';

type ExpenseListProps = {
  transactionDate: Date;
};

export default function ExpensesList({ transactionDate }: ExpenseListProps) {
  const { data: expenses, isLoading } = useExpense({
    filterType: 'monthly',
    transactionDate,
  });

  if (isLoading) {
    // TODO: add loading skeleton
    return null;
  }

  const handleDeleteItem = (id: Expense['id']) => {
    // TODO: add delete function
    console.log('Deleting item with id: ', id);
  };

  return (
    <Container style={{ gap: 8, paddingBottom: 16 }}>
      {expenses?.map(item => (
        <ExpenseItem key={item.id} onDelete={handleDeleteItem} expense={item} />
      ))}
    </Container>
  );
}
