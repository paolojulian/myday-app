import { useQuery } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSQLiteContext } from 'expo-sqlite';
import { Task, TaskQueryKeys } from './task.types';

type SupportedTaskFields = Pick<Task, 'id' | 'reminder_date'>;

export default function useTaskOverview() {
  const db = useSQLiteContext();

  const setup = async () => {
    const query = buildQuery();
    const result = await db.getAllAsync<SupportedTaskFields>(query);

    return transformData(result);
  };

  const { data, isLoading } = useQuery({
    queryKey: [TaskQueryKeys.task, TaskQueryKeys.overview],
    queryFn: setup,
    initialData: { totalTasks: 0, dueToday: 0, overdue: 0 },
  });

  return { isLoading, data };
}

function buildQuery() {
  return `
    SELECT id, reminder_date FROM task
    WHERE is_completed = 0
  `;
}

function transformData(data?: SupportedTaskFields[]) {
  if (!data) return { totalTasks: 0, dueToday: 0, overdue: 0 };

  return {
    totalTasks: data.length,
    dueToday: data.filter(task => isDueToday(task.reminder_date)).length,
    overdue: data.filter(task => isOverdue(task.reminder_date)).length,
  };
}

function isDueToday(reminderDate?: number | null) {
  if (!reminderDate) return false;

  return dayjs.unix(reminderDate).isSame(dayjs(), 'day');
}

function isOverdue(reminderDate?: number | null) {
  if (!reminderDate) return false;

  return dayjs.unix(reminderDate).isBefore(dayjs(), 'day');
}
