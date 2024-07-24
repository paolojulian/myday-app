import {
  ExpenseListItem,
  ExpenseQueryFilters,
  ExpenseQueryKeys,
  ExpenseWithCategoryName,
} from '@/hooks/services/expense/expense.types';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { SQLiteBindParams, useSQLiteContext } from 'expo-sqlite';

type ReturnData = ExpenseWithCategoryName & {
  recurred_items: string; // JSON stringified array of Expense[]
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
    if (expense.recurrence) {
      recurred_items = JSON.parse(expense.recurred_items);
    }

    return {
      ...expense,
      recurred_items,
    };
  });
}

function buildQuery(filter: ExpenseQueryFilters) {
  switch (filter.filterType) {
    case 'monthly':
      return /* sql */ `
        WITH RecurringBase AS (
          SELECT
            e.id,
            e.title,
            e.amount,
            e.description,
            e.category_id,
            e.transaction_date,
            e.recurrence,
            e.recurrence_id,
            e.created_at,
            e.updated_at,
            e.deleted_at,
            c.category_name
          FROM
            expense e
          LEFT JOIN
            category c ON e.category_id = c.id
          WHERE
            e.recurrence IS NOT NULL
        )
        SELECT
          e.id,
          e.title,
          e.amount,
          e.description,
          e.category_id,
          e.transaction_date,
          e.recurrence,
          e.recurrence_id,
          e.created_at,
          e.updated_at,
          e.deleted_at,
          c.category_name,
          json_group_array(
            json_object(
              'id', re.id,
              'title', re.title,
              'amount', re.amount,
              'description', re.description,
              'category_id', re.category_id,
              'transaction_date', re.transaction_date,
              'recurrence', re.recurrence,
              'recurrence_id', re.recurrence_id,
              'created_at', re.created_at,
              'updated_at', re.updated_at,
              'deleted_at', re.deleted_at
            )
          ) AS recurred_items
        FROM
          RecurringBase e
        LEFT JOIN
          expense re ON e.id = re.recurrence_id
        LEFT JOIN
          category c ON e.category_id = c.id
        WHERE
          re.transaction_date BETWEEN $start AND $end
        GROUP BY
          e.id
        ORDER BY
          e.transaction_date DESC;
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
