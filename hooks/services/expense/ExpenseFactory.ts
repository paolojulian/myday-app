import { Expense } from '@/hooks/services/expense/expense.types';

class ExpenseFactory {
  item: Partial<Expense>;

  constructor({
    id,
    title,
    amount,
    description,
    category_id,
    transaction_date,
    recurrence,
    recurrence_id,
    created_at,
    updated_at,
    deleted_at,
  }: Partial<Expense>) {
    const now = Date.now();

    const item = {
      id,
      title,
      amount,
      description,
      category_id,
      transaction_date: transaction_date || now,
      recurrence,
      recurrence_id,
      created_at: created_at || now,
      updated_at: updated_at || now,
      deleted_at,
    };
    this.item = item;
  }

  toObject() {
    return this.item;
  }

  toInsertValues() {
    const values = Object.values(this.item)
      .map(value => {
        if (typeof value === 'number') return value;
        return value === undefined || value === null ? 'NULL' : `'${value}'`;
      })
      .join(', ');

    const valuesString = `(${values})`;
    return valuesString;
  }
}

export default ExpenseFactory;
