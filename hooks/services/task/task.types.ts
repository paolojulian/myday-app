export interface Task {
  id: number;
  title: string;
  description: string;
  category_id: number;
  is_completed: number;
  to_buy: number;
  expected_amount: number | null;
  reminder_date: number | null;
  recurrence_type: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'custom' | null;
  recurrence_days: string | null;
  recurrence_id: number | null;
  started_at: number | null;
  ended_at: number | null;
  created_at: number;
  updated_at: number;
  deleted_at: number | null;
}

export enum TaskQueryKeys {
  task = 'task',
  list = 'task-list',
  overview = 'task-overview',
  priority = 'task-priority',
  tasksDueToday = 'task-due-today',
  tasksDueTomorrow = 'task-due-tomorrow',
}

export type TaskFilterTypes = 'Today' | 'All' | 'Scheduled' | 'Completed';

export type TaskQueryFilters = {
  filterType: TaskFilterTypes;
};
