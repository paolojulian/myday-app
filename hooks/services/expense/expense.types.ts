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

export type ExpenseWithCategoryName = Expense & {
  category_id: Category['id'] | null;
  category_name: string | null;
};

export enum ExpenseQueryKeys {
  item = 'expense-item',
  list = 'expenses-list',
  recurringExpenses = 'recurring-expenses',
  totalExpenses = 'total-expenses',
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
