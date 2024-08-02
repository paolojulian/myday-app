import { Category } from '@/hooks/services/category/category.types';
import { ExpenseListItem } from '@/hooks/services/expense/expense.types';
import { ExpenseFlatListItems } from './ExpenseList.types';

export function getCategoriesFromExpenses(expenses?: ExpenseListItem[]) {
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

export type CategoryItemFields = {
  type: 'category';
  categoryId: Category['id'];
  categoryName: Category['category_name'];
  totalAmount: number;
};
export function groupExpensesByCategory(
  expenses: Pick<ExpenseListItem, 'category_id' | 'category_name' | 'amount'>[],
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

export function getTotalAmount(expenses: Pick<ExpenseListItem, 'amount'>[]): number {
  return expenses.reduce((acc, { amount }) => acc + amount, 0);
}

export function keyExtractor(item: ExpenseFlatListItems): string {
  if (isFilter(item)) {
    return 'filter';
  }

  if (isCategory(item)) {
    return `Category:${item.categoryId}`;
  }

  return item.id.toString();
}

export function isFilter(item: ExpenseFlatListItems): item is { isFilter: boolean } {
  return 'isFilter' in item && item.isFilter === true;
}

export function isCategory(item: CategoryItemFields | ExpenseListItem): item is CategoryItemFields {
  return 'type' in item && item.type === 'category';
}
