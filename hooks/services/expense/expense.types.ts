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
  category_id: Category['id'];
  category_name: string;
};

export enum ExpenseQueryKeys {
  list = 'expenses-list',
  recurringExpenses = 'recurring-expenses',
}

export type ExpenseQueryFilters =
  | {
      transactionDate: Date;
      filterType: 'monthly';
    }
  | {
      transactionDate: Date;
      categoryId: Category['id'];
      filterType: 'category';
    };
