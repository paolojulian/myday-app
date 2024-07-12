import { Category } from '@/hooks/services/category/category.types';
import { Expense, ExpenseWithCategoryName } from '@/hooks/services/expense/expense.types';

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

type ExpenseCategoryItem = {
  categoryId: Category['id'] | null;
  categoryName: Category['category_name'];
  totalAmount: Expense['amount'];
};
export function buildCategoryList(expenses?: ExpenseWithCategoryName[]) {
  if (!expenses) return [];

  const expenseCategories = expenses.reduce((acc: ExpenseCategoryItem[], currentValue) => {
    const categoryIndex = acc.findIndex(expense => expense.categoryId === currentValue.category_id);

    // No category yet
    if (categoryIndex === -1) {
      acc.push({
        categoryId: currentValue.category_id ?? null,
        categoryName: currentValue.category_name ?? 'Uncategorized',
        totalAmount: currentValue.amount,
      });

      return acc;
    }

    acc[categoryIndex].totalAmount += currentValue.amount;

    return acc;
  }, []);

  return expenseCategories;
}
