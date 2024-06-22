export interface Task {
  id: number;
  title: string;
  description: string;
  category_id: number;
  is_completed: number;
  to_buy: number;
  expected_amount: number | null;
  reminder_date: number | null;
  started_at: number;
  ended_at: number;
  created_at: number;
  updated_at: number;
  deleted_at: number;
}

export enum TaskQueryKeys {
  list = 'task-list',
}

export type TaskFilterTypes = 'Today' | 'All' | 'Scheduled' | 'Completed';

export type TaskQueryFilters = {
  filterType: TaskFilterTypes;
};
