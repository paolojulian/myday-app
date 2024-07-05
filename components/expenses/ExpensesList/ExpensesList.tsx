import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import BudgetCard from '@/components/expenses/BudgetCard';
import { getCategoriesFromExpenses } from '@/components/expenses/ExpensesList/ExpensesList.utils';
import ExpensesListCategories from '@/components/expenses/ExpensesList/ExpensesListCategories';
import { colors } from '@/constants/Colors';
import { Category } from '@/hooks/services/category/category.types';
import { Expense, ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';
import useExpenses from '@/hooks/services/expense/useExpenses';
import { useState } from 'react';
import { FlatList } from 'react-native';
import ExpenseItem from './ExpensesListItem/ExpenseItem';

type ExpenseListProps = {
  transactionDate: Date;
};

export default function ExpensesList({ transactionDate }: ExpenseListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category['id'] | null>(null);
  // const filterType = selectedCategory === null ? 'monthly' : 'category';
  const { data: expenses, isLoading } = useExpenses({
    filterType: 'monthly',
    transactionDate,
    // categoryId: filterType === 'monthly' ? undefined : selectedCategory,
  });

  if (isLoading) {
    // TODO: add loading skeleton
    return null;
  }

  const filteredExpenses = selectedCategory
    ? expenses?.filter(item => item.category_id === selectedCategory)
    : expenses;
  const categories = getCategoriesFromExpenses(expenses);

  const handleDeleteItem = (id: Expense['id']) => {
    // TODO: add delete function
    console.log('Deleting item with id: ', id);
  };

  return (
    <FlatList
      data={[{ isFilters: true }, ...(filteredExpenses ?? [])]}
      renderItem={({ item }) => {
        if (isFilterItem(item)) {
          return (
            <ThemedView style={{ backgroundColor: colors.white, paddingVertical: 16 }}>
              <ExpensesListCategories
                onSelectCategory={setSelectedCategory}
                categories={categories}
              />
            </ThemedView>
          );
        }

        if (!isExpenseWithCategoryName(item)) {
          return null;
        }

        return (
          <Container>
            <ExpenseItem key={item.id} onDelete={handleDeleteItem} expense={item} />
          </Container>
        );
      }}
      ItemSeparatorComponent={() => <ThemedView style={{ height: 8 }} />}
      ListHeaderComponent={() => (
        <Container style={{ gap: 24, backgroundColor: colors.black, paddingVertical: 24 }}>
          <ThemedText variant="heading" style={{ color: colors.white }}>
            Monthly Expenses
          </ThemedText>
          <BudgetCard />
        </Container>
      )}
      ListFooterComponent={() => <ThemedView style={{ height: 16 }} />}
      stickyHeaderIndices={[1]}
    />
  );
}

function isFilterItem(item?: any): item is { isFilters: true } {
  return item?.isFilters;
}

function isExpenseWithCategoryName(item?: any): item is ExpenseWithCategoryName {
  return (item as ExpenseWithCategoryName)?.category_name !== undefined;
}
