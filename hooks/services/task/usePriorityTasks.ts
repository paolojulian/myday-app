import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSQLiteContext } from 'expo-sqlite';
import { Task, TaskQueryKeys } from './task.types';

export function usePriorityTasks() {
  const db = useSQLiteContext();

  async function setup() {
    const variables = buildVariables();
    const result = await db.getAllAsync<Task>(GET_PRIORITY_TASKS_QUERY, variables);
    return result;
  }

  return useQuery({
    queryKey: [TaskQueryKeys.task, TaskQueryKeys.priority],
    queryFn: setup,
  });
}

function buildVariables() {
  return {
    $startOfDayEpoch: dayjs().startOf('day').unix(),
    $endOfDayEpoch: dayjs().endOf('day').unix(),
  };
}

const GET_PRIORITY_TASKS_QUERY = /* sql */ `
  SELECT * FROM task
  WHERE is_completed = 0
  ORDER BY 
    CASE
      WHEN reminder_date < $startOfDayEpoch THEN 1 -- Overdue
      WHEN reminder_date BETWEEN $startOfDayEpoch AND $endOfDayEpoch THEN 2 -- Due today
      ELSE 3 -- Future
    END,
    reminder_date ASC
  LIMIT 3
`;
