import { useQuery } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { Task, TaskQueryKeys } from './task.types';

export const useTask = (id: Task['id']) => {
  const db = useSQLiteContext();

  return useQuery({
    queryKey: [TaskQueryKeys.task, id],
    queryFn: async () => {
      const query = buildQuery();
      const result = await db.getFirstAsync<Task>(query, {
        $id: id,
      });

      return result;
    },
  });
};

function buildQuery() {
  return `
    SELECT * FROM task
    WHERE id = $id
  `;
}
