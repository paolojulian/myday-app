import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { Task, TaskQueryKeys } from './task.types';

export function useDeleteTask(id: Task['id']) {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      const result = await db.runAsync(DELETE_TASK_STATEMENT, { $id: id });
      console.log({ result });

      return result;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        predicate: query => {
          return query.queryKey[0] === TaskQueryKeys.task;
        },
      });
    },
  });
}

const DELETE_TASK_STATEMENT = /* sql */ `
  DELETE FROM task
  WHERE id = $id
`;
