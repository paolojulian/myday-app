import { Category } from '@/hooks/services/category/category.types';
import { ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';
import { SupportedExpenseFilter } from './ExpensesListFilter/ExpensesListFilter';

export function getCategoriesFromExpenses(expenses?: ExpenseWithCategoryName[]) {
  if (!expenses) {
    return [];
  }

  const reducedExpenses = expenses.reduce(
    (
      acc: { category_id: Category['id']; category_name: Category['category_name'] }[],
      { category_id, category_name },
    ) => {
      if (
        acc.findIndex(expense => expense.category_id === category_id) < 0 &&
        category_id &&
        category_name
      ) {
        acc.push({ category_id, category_name });
      }
      return acc;
    },
    [],
  );

  return reducedExpenses;
}

export function buildListByFilter({
  expenses,
  selectedFilter,
}: {
  expenses?: ExpenseWithCategoryName[];
  selectedFilter: SupportedExpenseFilter;
}): ExpenseWithCategoryName[] | CategoryItemFields[] {
  if (!expenses) {
    return [];
  }

  if (selectedFilter === 'item') {
    return expenses;
  }

  return [];
}

export type CategoryItemFields = {
  type: 'category';
  categoryId: Category['id'];
  categoryName: Category['category_name'];
  totalAmount: number;
};
export function groupExpensesByCategory(
  expenses: Pick<ExpenseWithCategoryName, 'category_id' | 'category_name' | 'amount'>[],
): CategoryItemFields[] {
  const categoryItems: CategoryItemFields[] = [];

  expenses.forEach(expense => {
    const categoryIndex = categoryItems.findIndex(
      category => category.categoryId === expense.category_id,
    );
    const doesCategoryExist = categoryIndex !== -1;

    // Update existing category
    if (doesCategoryExist) {
      categoryItems[categoryIndex].totalAmount += expense.amount;
    } else if (expense.category_id && expense.category_name) {
      categoryItems.push({
        type: 'category',
        categoryId: expense.category_id,
        categoryName: expense.category_name,
        totalAmount: expense.amount,
      });
    }
  });

  return categoryItems.sort((a, b) => b.totalAmount - a.totalAmount);
}

export function getTotalAmount(expenses: Pick<ExpenseWithCategoryName, 'amount'>[]): number {
  return expenses.reduce((acc, { amount }) => acc + amount, 0);
}
