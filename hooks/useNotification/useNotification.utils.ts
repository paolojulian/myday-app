import dayjs from 'dayjs';
import { Task } from '../services/task/task.types';
import * as Notifications from 'expo-notifications';
import { ReturnType } from '@/utils/types/common-types';

export type SupportedTaskFieldsForNotification = Pick<Task, 'id' | 'reminder_date' | 'title'> & {
  reminder_date: number;
};

// This service handles all notification-related logic
export const scheduleNotification = async (
  task: SupportedTaskFieldsForNotification,
): Promise<[string | null, Error | null]> => {
  if (!task.reminder_date) {
    return [null, null];
  }
  if (typeof task.reminder_date !== 'number') {
    return [null, new Error('Reminder date is not a number')];
  }
  if (!dayjs.unix(task.reminder_date).isValid()) {
    return [null, new Error('Invalid reminder date')];
  }

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task Reminder',
        body: `Don't forget to complete: ${task.title}`,
        sound: true,
      },
      trigger: { date: new Date(task.reminder_date) },
    });
    return [notificationId, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error];
    }

    return [null, new Error('Something went wrong')];
  }
};

export const cancelNotification = async (notificationId: string): Promise<ReturnType<null>> => {
  try {
    await Notifications.cancelScheduledNotificationAsync(notificationId);

    return [null, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error];
    }

    return [null, new Error('Something went wrong')];
  }
};

export const generateMessageForTasksToday = (
  tasks: SupportedTaskFieldsForNotification[],
): ReturnType<string> => {
  tasks.forEach(task => {
    if (!task.reminder_date) {
      return [null, new Error('Reminder date is missing')];
    }

    if (typeof task.reminder_date !== 'number') {
      return [null, new Error('Reminder date is not a number')];
    }

    if (!dayjs.unix(task.reminder_date).isValid()) {
      return [null, new Error('Invalid reminder date')];
    }
  });

  const taskItems = tasks.map(task => {
    return `
      • ${task.title} - ${dayjs.unix(task.reminder_date).format('HH:mm')}
    `;
  });

  const message = `
    Here are your tasks due today
    ${taskItems.join('\n')}
  `;

  return [message, null];
};

export const scheduleNotificationsForToday = async (
  tasks: SupportedTaskFieldsForNotification[],
): Promise<ReturnType<string>> => {
  const [message, error] = generateMessageForTasksToday(tasks);
  if (error !== null) {
    return [null, error];
  }

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      content: {
        title: 'Task due today',
        body: message,
        sound: true,
      },
      trigger: { date: dayjs().hour(7).minute(0).second(0).toDate() },
    });

    return [notificationId, null];
  } catch (error) {
    console.log({ error });
    if (error instanceof Error) {
      return [null, error];
    }

    return [null, new Error('Something went wrong')];
  }
};
