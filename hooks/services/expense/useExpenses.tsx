import {
  ExpenseQueryFilters,
  ExpenseQueryKeys,
  ExpenseWithCategoryName,
} from '@/hooks/services/expense/expense.types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { SQLiteBindParams, useSQLiteContext } from 'expo-sqlite';

const useExpenses = (filter: ExpenseQueryFilters) => {
  const db = useSQLiteContext();

  const setup = async () => {
    if (!filter) {
      throw new Error('Invalid filters provided');
    }
    const query = buildQuery(filter);
    const variables = buildVariables(filter);

    return await db.getAllAsync<ExpenseWithCategoryName>(query, variables);
  };

  return useQuery({
    queryKey: [ExpenseQueryKeys.list, filter],
    queryFn: setup,
    refetchOnWindowFocus: true,
  });
};

function buildQuery(filter: ExpenseQueryFilters) {
  switch (filter.filterType) {
    case 'monthly':
      return /* sql */ `
        SELECT expense.*, category.id as category_id, category.category_name as category_name FROM expense
        LEFT JOIN category ON expense.category_id = category.id
        WHERE transaction_date BETWEEN $start AND $end
          AND recurrence IS NULL
        ORDER BY expense.transaction_date DESC
      `;
    case 'category':
      return /* sql */ `
        SELECT expense.*, category.id as category_id, category.category_name as category_name FROM expense
        LEFT JOIN category ON expense.category_id = category.id
        WHERE category_id = $categoryId
          AND transaction_date BETWEEN $start AND $end
          AND recurrence IS NULL
        ORDER BY expense.transaction_date DESC
      `;
    case 'recent-transactions':
      return /* sql */ `
        SELECT expense.*, category.id as category_id, category.category_name as category_name FROM expense
        WHERE recurrence IS NULL
        LEFT JOIN category ON expense.category_id = category.id
        ORDER BY expense.transaction_date DESC
        LIMIT 5 
      `;
    default:
      throw new Error(`Invalid filter type: ${(filter as any).filterType}`);
  }
}

function buildVariables(filter: ExpenseQueryFilters): SQLiteBindParams {
  switch (filter.filterType) {
    case 'recent-transactions':
      return {};
    case 'monthly':
      return {
        $start: dayjs(filter.transactionDate).startOf('month').unix().toString(),
        $end: dayjs(filter.transactionDate).endOf('month').unix().toString(),
      };
    case 'category':
      return {
        $categoryId: filter.categoryId,
        $start: dayjs(filter.transactionDate).startOf('month').unix().toString(),
        $end: dayjs(filter.transactionDate).endOf('month').unix().toString(),
      };
    default:
      throw new Error(`Invalid filter type: ${(filter as any).filterType}`);
  }
}

export default useExpenses;
