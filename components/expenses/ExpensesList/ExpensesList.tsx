import Container from '@/components/common/Container';
import ExpenseItem from './ExpensesListItem/ExpenseItem';
import useExpense from '@/hooks/services/expense/useExpense';
import ThemedText from '@/components/common/ThemedText';
import { Expense } from '@/hooks/services/expense/expense.types';

export default function ExpensesList() {
  const { data: expenses, isLoading } = useExpense();

  if (isLoading) {
    // TODO: add loading skeleton
    return <ThemedText>Loading...</ThemedText>;
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
