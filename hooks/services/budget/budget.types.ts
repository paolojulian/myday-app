export interface Budget {
  id: number;
  amount: number;
  created_at: number;
}

export enum BudgetQueryKeys {
  month = 'month',
}
