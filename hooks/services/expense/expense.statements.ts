export const FETCH_MONTHLY_EXPENSES = /* sql */ `
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
  )
  SELECT
    RecurringBase.id,
    RecurringBase.title,
    RecurringBase.amount,
    RecurringBase.description,
    RecurringBase.category_id,
    RecurringBase.transaction_date,
    RecurringBase.recurrence,
    RecurringBase.recurrence_id,
    RecurringBase.created_at,
    RecurringBase.updated_at,
    RecurringBase.deleted_at,
    category.category_name,
    json_group_array(
      CASE
        WHEN expense.transaction_date BETWEEN $start AND $end THEN
          json_object(
            'id', expense.id,
            'title', expense.title,
            'amount', expense.amount,
            'description', expense.description,
            'category_id', expense.category_id,
            'transaction_date', expense.transaction_date,
            'recurrence', expense.recurrence,
            'recurrence_id', expense.recurrence_id,
            'created_at', expense.created_at,
            'updated_at', expense.updated_at,
            'deleted_at', expense.deleted_at
          )
        ELSE NULL
      END
    ) FILTER (WHERE expense.id IS NOT NULL) AS recurred_items
  FROM
    RecurringBase
  LEFT JOIN
    expense ON RecurringBase.id = expense.recurrence_id
  LEFT JOIN
    category ON RecurringBase.category_id = category.id
  WHERE
    (
      RecurringBase.transaction_date BETWEEN $start AND $end
      AND RecurringBase.recurrence IS NULL
      AND RecurringBase.recurrence_id IS NULL
    )
    OR
    (expense.transaction_date BETWEEN $start AND $end)
    OR
    (RecurringBase.recurrence IS NOT NULL AND RecurringBase.recurrence_id IS NULL)
  GROUP BY
    RecurringBase.id
  ORDER BY
    RecurringBase.transaction_date DESC;
`;
