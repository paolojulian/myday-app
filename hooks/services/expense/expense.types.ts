export interface Expense {
  id: number;
  title: string;
  amount: number;
  description: string;
  category_id: number | null;
  transaction_date: number;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
}

export type ExpenseWithCategoryName = Expense & { category_name: string };

export enum ExpenseQueryKeys {
  list = 'expenses-list',
}

export enum ExpenseFilterEnum {
  daily = 'Daily',
  monthly = 'Monthly',
  yearly = 'Yearly',
}

export type ExpenseQueryFilters = {
  transactionDate: Date;
  filterType: ExpenseFilterEnum;
};
