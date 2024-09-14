import { useQuery } from '@tanstack/react-query';
import { TaskQueryKeys } from './task.types';
import { useSQLiteContext } from 'expo-sqlite';
import dayjs from 'dayjs';
import { Task } from 'react-native';

export const useTasksToday = () => {
  const db = useSQLiteContext();

  return useQuery({
    queryKey: [TaskQueryKeys.tasksToday],
    queryFn: async () => {
      const query = buildQuery();
      const result = await db.getAllAsync<Task>(query, {
        $startOfDayEpoch: dayjs().startOf('day').unix(),
        $endOfDayEpoch: dayjs().endOf('day').unix(),
      });

      return result;
    },
  });
};

function buildQuery() {
  return `
    SELECT * FROM task
    WHERE reminder_date BETWEEN $startOfDayEpoch AND $endOfDayEpoch
      AND is_completed = 0
  `;
}
