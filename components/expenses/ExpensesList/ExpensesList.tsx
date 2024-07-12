import Container from '@/components/common/Container';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedView from '@/components/common/ThemedView';
import { Expense } from '@/hooks/services/expense/expense.types';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { useState } from 'react';
import { FlatList } from 'react-native';
import EditBudgetCard from '../EditBudgetCard';
import RemainingBudgetCard from '../RemainingBudgetCard';
import ExpensesListFilter from './ExpensesListFilter';
import { SupportedExpenseFilter } from './ExpensesListFilter/ExpensesListFilter';
import ExpensesListHeader from './ExpensesListHeader/ExpensesListHeader';
import ExpenseItem from './ExpensesListItem/ExpenseItem';

export default function ExpensesList() {
  const [transactionDate] = useState(new Date());
  const [_, setSelectedFilter] = useState<SupportedExpenseFilter>('item');

  const { data: expenses, isLoading } = useExpenses({
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
    <FlatList
      data={[...(expenses ?? [])]}
      renderItem={({ item }) => (
        <Container>
          <ExpenseItem key={item.id} onDelete={handleDeleteItem} expense={item} />
        </Container>
      )}
      ItemSeparatorComponent={() => <ThemedView style={{ height: 8 }} />}
      ListHeaderComponent={() => (
        <>
          <Stack style={{ gap: 8 }}>
            <ExpensesListHeader />
            <Container>
              <Row style={{ gap: 8 }}>
                <RemainingBudgetCard variant="horizontal" />
                <EditBudgetCard />
              </Row>
            </Container>

            <ExpensesListFilter onSelectFilter={setSelectedFilter} />
          </Stack>
        </>
      )}
      ListFooterComponent={() => <ThemedView style={{ height: 16 }} />}
    />
  );
}
