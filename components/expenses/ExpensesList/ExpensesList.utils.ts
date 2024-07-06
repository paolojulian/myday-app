import { Category } from '@/hooks/services/category/category.types';
import { ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';

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
