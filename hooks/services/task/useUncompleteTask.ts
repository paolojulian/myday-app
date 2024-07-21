import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';
import { TaskQueryKeys } from './task.types';

export function useUncompleteTask() {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => {
      await db.runAsync('UPDATE task SET is_completed = 0 WHERE id = $id', {
        $id: id,
      });
    },
    onSuccess: async response => {
      queryClient.invalidateQueries({
        predicate: query => {
          const firstQueryKey = query.queryKey[0];
          if (typeof firstQueryKey !== 'string') {
            return false;
          }

          const invalidateQueries: string[] = [
            TaskQueryKeys.list,
            TaskQueryKeys.priority,
            TaskQueryKeys.overview,
          ];
          return invalidateQueries.includes(firstQueryKey);
        },
      });

      return response;
    },
  });
}
