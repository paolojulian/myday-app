import { Category } from '@/hooks/services/category/category.types';

export interface Expense {
  id: number;
  title: string;
  amount: number;
  description: string;
  category_id: number | null;
  transaction_date: number;
  recurrence: 'weekly' | 'monthly' | 'yearly' | null;
  recurrence_id: number | null;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
}

export type ExpenseWithRecurredItems = Expense & {
  recurred_items: Expense[];
};

export type ExpenseWithCategoryName = Expense & {
  category_id: Category['id'] | null;
  category_name: string | null;
};

export type ExpenseListItem = ExpenseWithRecurredItems & ExpenseWithCategoryName;

export enum ExpenseQueryKeys {
  expense = 'expense',
  item = 'expense-item',
  recurrenceItems = 'recurrence-items',
  list = 'expenses-list',
  totalExpenses = 'total-expenses',
  expenseCategoryList = 'expense-category-list',
}
export const expenseQueryKeys = Object.values(ExpenseQueryKeys);

export type ExpenseQueryFilters =
  | {
      transactionDate: Date;
      filterType: 'monthly';
    }
  | {
      transactionDate: Date;
      categoryId: Category['id'];
      filterType: 'category';
    }
  | {
      filterType: 'recent-transactions';
    };
