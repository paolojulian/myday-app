export interface Expense {
  id: number;
  title: string;
  amount: number;
  description: string;
  category_id: number;
  transaction_date: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

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
