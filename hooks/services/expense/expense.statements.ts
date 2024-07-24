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
      CASE
        WHEN re.transaction_date BETWEEN $start AND $end THEN
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
        ELSE NULL
      END
    ) FILTER (WHERE re.id IS NOT NULL) AS recurred_items
  FROM
    RecurringBase e
  LEFT JOIN
    expense re ON e.id = re.recurrence_id
  LEFT JOIN
    category c ON e.category_id = c.id
  WHERE
    (e.transaction_date BETWEEN $start AND $end AND e.recurrence IS NULL AND e.recurrence_id IS NULL)
    OR
    (re.transaction_date BETWEEN $start AND $end)
  GROUP BY
    e.id
  ORDER BY
    e.transaction_date DESC;
`;
