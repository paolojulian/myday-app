import Container from '@/components/common/Container';
import { Expense } from '@/hooks/services/expense/expense.types';
import useExpense from '@/hooks/services/expense/useExpense';
import ExpenseItem from './ExpensesListItem/ExpenseItem';
import ExpensesListCategories from '@/components/expenses/ExpensesList/ExpensesListCategories';
import { useState } from 'react';
import { Category } from '@/hooks/services/category/category.types';
import { getCategoriesFromExpenses } from '@/components/expenses/ExpensesList/ExpensesList.utils';

type ExpenseListProps = {
  transactionDate: Date;
};

export default function ExpensesList({ transactionDate }: ExpenseListProps) {
  const [selectedCategory, setSelectedCategory] = useState<Category['id'] | null>(null);
  // const filterType = selectedCategory === null ? 'monthly' : 'category';
  const { data: expenses, isLoading } = useExpense({
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
    <>
      <ExpensesListCategories onSelectCategory={setSelectedCategory} categories={categories} />
      <Container style={{ gap: 8, paddingBottom: 16 }}>
        {filteredExpenses?.map(item => (
          <ExpenseItem key={item.id} onDelete={handleDeleteItem} expense={item} />
        ))}
      </Container>
    </>
  );
}
