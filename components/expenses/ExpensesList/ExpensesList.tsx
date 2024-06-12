import Container from '@/components/common/Container';
import ExpenseItem from './ExpensesListItem/ExpenseItem';
import useExpense from '@/hooks/services/expense/useExpense';
import ThemedText from '@/components/common/ThemedText';

export default function ExpensesList() {
  const { data: expenses, isLoading } = useExpense();

  if (isLoading) {
    // TODO: add loading skeleton
    return <ThemedText>Loading...</ThemedText>;
  }

  return (
    <Container style={{ gap: 8 }}>
      {expenses?.map(item => <ExpenseItem key={item.id} onDelete={() => {}} expense={item} />)}
    </Container>
  );
}
