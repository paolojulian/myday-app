import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { useExpensesByCategory } from '@/hooks/services/expense/useExpensesByCategory';
import { useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import type { ExpenseFlatListItems } from './ExpenseList.types';
import ExpenseListRenderItems from './ExpenseListRenderItems';
import { getTotalAmount, keyExtractor } from './ExpensesList.utils';
import { SupportedExpenseFilter } from './ExpensesListFilter/ExpensesListFilter';
import ListHeaderComponent from './ExpensesListItem/ListHeaderComponent';

export default function ExpensesList() {
  const [transactionDate] = useState<Date>(new Date());
  const [selectedFilter, setSelectedFilter] = useState<SupportedExpenseFilter>('item');

  const {
    data: expenses,
    isLoading,
    refetch: refetchExpenses,
  } = useExpenses({
    filterType: 'monthly',
    transactionDate,
  });

  const { data: expensesByCategory, refetch: refetchExpensesByCategory } = useExpensesByCategory({
    transactionDate,
  });

  useFocusEffect(() => {
    refetchExpenses();
  });

  useEffect(() => {
    if (selectedFilter === 'category') {
      refetchExpensesByCategory();
    }
  }, [selectedFilter]);

  const totalExpensesAmount = expenses ? getTotalAmount(expenses) : 0;
  const data = selectedFilter === 'category' ? expensesByCategory : expenses;

  if (isLoading) {
    // TODO: add loading skeleton
    return null;
  }

  return (
    <>
      <FlatList<ExpenseFlatListItems>
        data={[{ isFilter: true }, ...data]}
        keyExtractor={keyExtractor}
        renderItem={({ item }) => (
          <ExpenseListRenderItems
            onSelectFilter={setSelectedFilter}
            selectedFilter={selectedFilter}
            item={item}
            totalExpensesAmount={totalExpensesAmount}
          />
        )}
        stickyHeaderIndices={[1]}
        ItemSeparatorComponent={() => <ThemedView style={{ height: 8 }} />}
        ListHeaderComponent={<ListHeaderComponent />}
        ListFooterComponent={<ThemedView style={{ height: 16 }} />}
        ListEmptyComponent={<ThemedText>No Expenses</ThemedText>}
      />
    </>
  );
}
