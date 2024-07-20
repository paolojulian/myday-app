import {
  CategoryItemFields,
  groupExpensesByCategory,
} from '@/components/expenses/ExpensesList/ExpensesList.utils';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSQLiteContext } from 'expo-sqlite';
import { Category } from '../category/category.types';
import { ExpenseQueryKeys } from './expense.types';
import { GlobalSnackbar } from '@/managers/SnackbarManager';

type ReturnData = {
  category_id: Category['id'];
  category_name: Category['category_name'];
  amount: number;
};

type Variables = {
  $start: string;
  $end: string;
};

type UseExpenseByCategoryProps = {
  transactionDate: Date;
};

export function useExpensesByCategory({ transactionDate }: UseExpenseByCategoryProps) {
  const db = useSQLiteContext();

  return useQuery<CategoryItemFields[]>({
    queryKey: [ExpenseQueryKeys.expenseCategoryList],
    queryFn: async () => {
      const query = buildQuery();
      const variables = buildVariables({ transactionDate });

      try {
        const result = await db.getAllAsync<ReturnData>(query, variables);
        return groupExpensesByCategory(result);
      } catch (error) {
        GlobalSnackbar.show({
          message: 'Unable to fetch expenses by category',
          type: 'error',
        });
        throw error;
      }
    },
    initialData: [],
    enabled: false,
  });
}

function buildQuery() {
  return /* sql */ `
    SELECT expense.category_id, expense.amount, category.category_name
    FROM expense
    LEFT JOIN category ON expense.category_id = category.id
    WHERE (
      transaction_date BETWEEN $start AND $end
      AND recurrence IS NULL
    )
  `;
}

function buildVariables({ transactionDate }: UseExpenseByCategoryProps): Variables {
  const dayjsTransactionDate = dayjs(transactionDate);

  return {
    $start: dayjsTransactionDate.startOf('month').unix().toString(),
    $end: dayjsTransactionDate.endOf('month').unix().toString(),
  };
}
