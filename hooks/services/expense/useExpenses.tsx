import {
  ExpenseListItem,
  ExpenseQueryFilters,
  ExpenseQueryKeys,
  ExpenseWithCategoryName,
} from '@/hooks/services/expense/expense.types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { SQLiteBindParams, useSQLiteContext } from 'expo-sqlite';
import { FETCH_MONTHLY_EXPENSES } from './expense.statements';

type ReturnData = ExpenseWithCategoryName & {
  recurred_items: string | null; // JSON stringified array of Expense[]
};

const useExpenses = (filter: ExpenseQueryFilters) => {
  const db = useSQLiteContext();

  return useQuery({
    queryKey: [ExpenseQueryKeys.list, filter],
    queryFn: async () => {
      if (!filter) {
        throw new Error('Invalid filters provided');
      }
      const query = buildQuery(filter);
      const variables = buildVariables(filter);

      const result = await db.getAllAsync<ReturnData>(query, variables);

      return reduceData(result);
    },
    initialData: [],
  });
};

function reduceData(data: ReturnData[]): ExpenseListItem[] {
  return data.map(expense => {
    let recurred_items: ExpenseListItem[] = [];
    let amount: number = expense.amount;

    if (expense.recurrence && expense.recurred_items) {
      recurred_items = JSON.parse(expense.recurred_items);
      amount = recurred_items.reduce((acc, recurredItem) => acc + recurredItem.amount, 0);
    }

    return {
      ...expense,
      amount,
      recurred_items,
    };
  });
}

function buildQuery(filter: ExpenseQueryFilters) {
  switch (filter.filterType) {
    case 'monthly':
      return FETCH_MONTHLY_EXPENSES;
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
        SELECT expense.*, category.id as category_id, category.category_name as category_name
        FROM expense
        LEFT JOIN category ON expense.category_id = category.id
        WHERE recurrence IS NULL
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
