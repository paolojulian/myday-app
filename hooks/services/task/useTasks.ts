import { Task, TaskQueryFilters, TaskQueryKeys } from '@/hooks/services/task/task.types';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { SQLiteBindParams, useSQLiteContext } from 'expo-sqlite';

const useTasks = (filters: TaskQueryFilters) => {
  const db = useSQLiteContext();

  async function setup() {
    const query = buildQuery(filters);
    const variables = buildVariables(filters);
    const result = await db.getAllAsync<Task>(query, variables);

    return result;
  }

  return useQuery({
    queryKey: [TaskQueryKeys.task, TaskQueryKeys.list, filters.filterType],
    queryFn: setup,
  });
};

function buildQuery(filters: TaskQueryFilters) {
  switch (filters.filterType) {
    case 'Today':
      return /* sql */ `
        SELECT * FROM task 
        WHERE task.reminder_date <= $end
          AND is_completed = 0
        ORDER BY reminder_date ASC
      `;
    case 'All':
      return /* sql */ `
        SELECT * FROM task
        WHERE is_completed = 0
        ORDER BY reminder_date ASC
      `;
    case 'Scheduled':
      return /* sql */ `
        SELECT * FROM task
        WHERE reminder_date IS NOT NULL
          AND is_completed = 0
        ORDER BY reminder_date ASC
      `;
    case 'Completed':
      return /* sql */ `
        SELECT * FROM task
        WHERE is_completed = 1
        ORDER BY reminder_date ASC
      `;
    default:
      throw new Error(`Invalid filter type: ${filters.filterType}`);
  }
}

function buildVariables(filters: TaskQueryFilters): SQLiteBindParams {
  if (filters.filterType === 'Today') {
    return {
      $end: convertDateToEpoch(dayjs().endOf('day').toDate()),
    };
  }

  return {};
}

export default useTasks;
