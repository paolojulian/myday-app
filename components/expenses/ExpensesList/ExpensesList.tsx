import Container from '@/components/common/Container';
import MainHeader from '@/components/common/MainHeader';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { ExpenseListItem } from '@/hooks/services/expense/expense.types';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { useExpensesByCategory } from '@/hooks/services/expense/useExpensesByCategory';
import { useFocusEffect } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList, View } from 'react-native';
import CategoryItem from './CategoryItem';
import { getTotalAmount, type CategoryItemFields } from './ExpensesList.utils';
import ExpensesListFilter, {
  SupportedExpenseFilter,
} from './ExpensesListFilter/ExpensesListFilter';
import ExpenseItemFactory from './ExpensesListItem/ExpenseItemFactory';
import ListHeaderComponent from './ExpensesListItem/ListHeaderComponent';
import EmptyExpenseList from './EmptyExpenseList';

export default function ExpensesList() {
  const [transactionDate, setTransactionDate] = useState<Date>(new Date());
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
  const dataWithFilter = data.length > 0 ? [{ isFilter: true }, ...data] : [];

  if (isLoading) {
    // TODO: add loading skeleton
    return null;
  }

  return (
    <>
      <MainHeader subtitle={'Expenses'} color={colors.v2.teal} />
      <FlatList<CategoryItemFields | ExpenseListItem | { isFilter: boolean }>
        data={dataWithFilter}
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
              <View style={{ paddingHorizontal: 16 }}>
                {isCategory(item) ? (
                  <CategoryItem
                    key={item.categoryId}
                    item={item}
                    totalExpensesAmount={totalExpensesAmount}
                  />
                ) : (
                  <ExpenseItemFactory key={item.id} expense={item} />
                )}
              </View>
            </Container>
          );
        }}
        stickyHeaderIndices={[1]}
        ItemSeparatorComponent={() => <ThemedView style={{ height: 4 }} />}
        ListHeaderComponent={
          <ListHeaderComponent
            transactionDate={transactionDate}
            onSetTransactionDate={setTransactionDate}
          />
        }
        ListFooterComponent={<ThemedView style={{ height: 16 }} />}
        ListEmptyComponent={<EmptyExpenseList />}
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
