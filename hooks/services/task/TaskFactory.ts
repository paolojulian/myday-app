import { Task } from '@/hooks/services/task/task.types';

class TaskFactory {
  private task: Partial<Task>;

  // INSERT INTO task (title, description, category_id, is_completed, to_buy, expected_amount, reminder_date, started_at, ended_at, created_at, updated_at, recurrence_type, recurrence_days, recurrence_id)
  constructor(item: Partial<Task>) {
    const now = Date.now();

    this.task = {
      title: item.title,
      description: item.description,
      category_id: item.category_id,
      is_completed: item.is_completed || 0,
      to_buy: item.to_buy || 0,
      expected_amount: item.expected_amount || 0,
      reminder_date: item.reminder_date || null,
      recurrence_type: item.recurrence_type || null,
      recurrence_days: item.recurrence_days || null,
      recurrence_id: item.recurrence_id || null,
      started_at: undefined,
      ended_at: undefined,
      created_at: item.created_at || now,
      updated_at: item.updated_at || now,
      deleted_at: item.deleted_at || null,
    };
  }

  toQuery() {
    const keys = Object.keys(this.task).join(', ');
    return /* sql */ `INSERT INTO task (${keys})`;
  }

  toObject() {
    return this.task;
  }

  toInsertValues() {
    const values = Object.values(this.task)
      .map(value => {
        if (typeof value === 'number') return value;
        return value === undefined || value === null ? 'NULL' : `'${value}'`;
      })
      .join(', ');

    const valuesString = `(${values})`;
    return valuesString;
  }
}

export default TaskFactory;
