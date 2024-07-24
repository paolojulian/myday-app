import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { ExpenseListItem } from '@/hooks/services/expense/expense.types';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { useExpensesByCategory } from '@/hooks/services/expense/useExpensesByCategory';
import { useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';
import CategoryItem from './CategoryItem';
import { getTotalAmount, type CategoryItemFields } from './ExpensesList.utils';
import ExpensesListFilter, {
  SupportedExpenseFilter,
} from './ExpensesListFilter/ExpensesListFilter';
import ExpenseItemFactory from './ExpensesListItem/ExpenseItemFactory';
import ListHeaderComponent from './ExpensesListItem/ListHeaderComponent';

export default function ExpensesList() {
  const [transactionDate] = useState(new Date());
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
      <FlatList<CategoryItemFields | ExpenseListItem | { isFilter: boolean }>
        data={[{ isFilter: true }, ...data]}
        keyExtractor={item => {
          if (isFilter(item)) {
            return 'filter';
          }

          if (isCategory(item)) {
            return `Category:${item.categoryId}`;
          }

          return item.id.toString();
        }}
        renderItem={({ item }) => {
          if (isFilter(item)) {
            return (
              <ExpensesListFilter
                selectedFilter={selectedFilter}
                onSelectFilter={setSelectedFilter}
              />
            );
          }

          return (
            <Container>
              {isCategory(item) ? (
                <CategoryItem
                  key={item.categoryId}
                  item={item}
                  totalExpensesAmount={totalExpensesAmount}
                />
              ) : (
                <ExpenseItemFactory key={item.id} expense={item} />
              )}
            </Container>
          );
        }}
        stickyHeaderIndices={[1]}
        ItemSeparatorComponent={() => <ThemedView style={{ height: 8 }} />}
        ListHeaderComponent={<ListHeaderComponent />}
        ListFooterComponent={<ThemedView style={{ height: 16 }} />}
        ListEmptyComponent={<ThemedText>No Expenses</ThemedText>}
      />
    </>
  );
}

function isFilter(
  item: CategoryItemFields | ExpenseListItem | { isFilter: boolean },
): item is { isFilter: boolean } {
  return 'isFilter' in item && item.isFilter === true;
}

function isCategory(item: CategoryItemFields | ExpenseListItem): item is CategoryItemFields {
  return 'type' in item && item.type === 'category';
}
