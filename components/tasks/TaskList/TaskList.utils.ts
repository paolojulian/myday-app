import { TaskFilterTypes } from '@/hooks/services/task/task.types';

export function isSupportedTaskFilter(type?: string): type is TaskFilterTypes {
  if (!type) {
    return false;
  }

  const types: TaskFilterTypes[] = ['Today', 'Tomorrow', 'All', 'Scheduled', 'Completed'];

  return types.includes(type as TaskFilterTypes);
}
