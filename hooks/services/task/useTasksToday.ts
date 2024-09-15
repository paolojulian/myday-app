import { useQuery } from '@tanstack/react-query';
import { Task, TaskQueryKeys } from './task.types';
import { useSQLiteContext } from 'expo-sqlite';
import dayjs from 'dayjs';

type SupportedTaskFields = Pick<Task, 'id' | 'reminder_date' | 'title'> & {
  reminder_date: number;
};

export const useTasksToday = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryKey: [TaskQueryKeys.tasksDueToday],
    queryFn: async () => {
      const today = dayjs();
      const query = buildQuery();
      const result = await db.getAllAsync<SupportedTaskFields>(query, {
        $startOfDayEpoch: today.startOf('day').unix(),
        $endOfDayEpoch: today.endOf('day').unix(),
      });

      return result;
    },
    enabled: false,
  });
};

function buildQuery() {
  return `
    SELECT id, reminder_date, title FROM task
    WHERE reminder_date IS NOT NULL
      AND reminder_date BETWEEN $startOfDayEpoch AND $endOfDayEpoch
      AND is_completed = 0
  `;
}
