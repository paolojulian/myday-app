import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { TaskQueryKeys } from './task.types';

export function useCompleteTask() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await db.runAsync('UPDATE task SET is_completed = 1 WHERE id = $id', {
        $id: id,
      });
    },
    onSuccess: async response => {
      queryClient.invalidateQueries({
        predicate: query => query.queryKey[0] === TaskQueryKeys.task,
      });

      return response;
    },
  });
}
