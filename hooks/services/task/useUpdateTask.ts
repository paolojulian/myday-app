import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Task, TaskQueryKeys } from './task.types';
import { SQLiteRunResult, useSQLiteContext } from 'expo-sqlite';

type SupportedUpdateTaskFields = Pick<Task, 'title' | 'description' | 'reminder_date'>;

export const useUpdateTask = (id: Task['id']) => {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (task: SupportedUpdateTaskFields): Promise<SQLiteRunResult> => {
      const now_epoch = Date.now();
      const variables = {
        $title: task.title,
        $description: task.description,
        $reminder_date: task.reminder_date,
        $updated_at: now_epoch,
        $id: id,
      };
      const statement = buildStatement();
      const result = await db.runAsync(statement, variables);
      return result;
    },
    onSuccess: response => {
      queryClient.invalidateQueries({
        predicate: query => {
          if (
            query.queryKey.length === 2 &&
            query.queryKey[0] === TaskQueryKeys.task &&
            query.queryKey[1] === id
          ) {
            return true;
          }

          return query.queryKey[0] === TaskQueryKeys.task;
        },
      });
      return response;
    },
  });
};

function buildStatement() {
  return `
    UPDATE task
    SET title = $title, description = $description, reminder_date = $reminder_date, updated_at = $updated_at
    WHERE id = $id
  `;
}
