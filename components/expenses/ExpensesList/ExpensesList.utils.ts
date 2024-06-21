import { ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';

export function getCategoriesFromExpenses(expenses?: ExpenseWithCategoryName[]) {
  if (!expenses) {
    return [];
  }

  const reducedExpenses = expenses.reduce(
    (
      acc: Pick<ExpenseWithCategoryName, 'category_id' | 'category_name'>[],
      { category_id, category_name },
    ) => {
      if (acc.findIndex(expense => expense.category_id === category_id) < 0) {
        acc.push({ category_id, category_name });
      }
      return acc;
    },
    [],
  );

  return reducedExpenses;
}
