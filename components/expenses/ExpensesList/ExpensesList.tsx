import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { Expense, ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { useMemo, useState } from 'react';
import { FlatList } from 'react-native';
import CategoryItem from './CategoryItem';
import { buildListByFilter, getTotalAmount, type CategoryItemFields } from './ExpensesList.utils';
import ExpensesListFilter, {
  SupportedExpenseFilter,
} from './ExpensesListFilter/ExpensesListFilter';
import ExpenseItem from './ExpensesListItem/ExpenseItem';
import ListHeaderComponent from './ExpensesListItem/ListHeaderComponent';

export default function ExpensesList() {
  const [transactionDate] = useState(new Date());
  const [selectedFilter, setSelectedFilter] = useState<SupportedExpenseFilter>('item');

  const { data: expenses, isLoading } = useExpenses({
    filterType: 'monthly',
    transactionDate,
  });

  const totalExpensesAmount = expenses ? getTotalAmount(expenses) : 0;
  const filteredData = useMemo(
    () =>
      buildListByFilter({
        expenses,
        selectedFilter,
      }),
    [expenses, selectedFilter],
  );

  if (isLoading) {
    // TODO: add loading skeleton
    return null;
  }

  const handleDeleteItem = (id: Expense['id']) => {
    // TODO: add delete function
    console.log('Deleting item with id: ', id);
  };

  return (
    <FlatList<CategoryItemFields | ExpenseWithCategoryName | { isFilter: boolean }>
      data={[{ isFilter: true }, ...filteredData]}
      contentContainerStyle={{
        justifyContent: 'flex-start',
      }}
      keyExtractor={item => {
        if (isFilter(item)) {
          return 'filter';
        }

        if (isCategory(item)) {
          return `Category:${item.categoryId}`;
        }

        return item.id.toString();
      }}
      stickyHeaderIndices={[1]}
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
              <ExpenseItem key={item.id} onDelete={handleDeleteItem} expense={item} />
            )}
          </Container>
        );
      }}
      ItemSeparatorComponent={() => <ThemedView style={{ height: 8 }} />}
      ListHeaderComponent={() => <ListHeaderComponent />}
      ListFooterComponent={() => <ThemedView style={{ height: 16 }} />}
      ListEmptyComponent={() => <ThemedText>No Expenses</ThemedText>}
    />
  );
}

function isFilter(
  item: CategoryItemFields | ExpenseWithCategoryName | { isFilter: boolean },
): item is { isFilter: boolean } {
  return 'isFilter' in item && item.isFilter === true;
}

function isCategory(
  item: CategoryItemFields | ExpenseWithCategoryName,
): item is CategoryItemFields {
  return 'type' in item && item.type === 'category';
}
