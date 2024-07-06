import { Task, TaskQueryKeys } from '@/hooks/services/task/task.types';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSQLiteContext } from 'expo-sqlite';

export type SupportedCreateTaskFields = Pick<
  Task,
  'title' | 'description' | 'is_completed' | 'reminder_date' | 'to_buy' | 'expected_amount'
>;

export const useCreateTask = () => {
  const db = useSQLiteContext();
  const queryClient = useQueryClient();

  async function setup(task: SupportedCreateTaskFields) {
    const now_epoch = convertDateToEpoch(new Date());
    const result = await db.runAsync(ADD_TASK_STATEMENT, {
      $title: task.title,
      $description: task.description,
      $reminder_date: task.reminder_date,
      $to_buy: task.to_buy,
      $expected_amount: task.expected_amount,
      $created_at: now_epoch,
      $updated_at: now_epoch,
    });

    return result;
  }

  const { data, error, mutate, isPending } = useMutation({
    mutationFn: setup,
    onSuccess: response => {
      queryClient.invalidateQueries({
        predicate(query) {
          return (
            query.queryKey[0] === TaskQueryKeys.list || query.queryKey[0] === TaskQueryKeys.overview
          );
        },
      });

      return response;
    },
  });

  return { data, isLoading: isPending, error, mutate };
};

const ADD_TASK_STATEMENT = `
  INSERT INTO task (title, description, reminder_date, to_buy, expected_amount, created_at, updated_at)
  VALUES ($title, $description, $reminder_date, $to_buy, $expected_amount, $created_at, $updated_at)
`;
