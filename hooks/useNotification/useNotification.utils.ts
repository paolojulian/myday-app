import dayjs from 'dayjs';
import { Task } from '../services/task/task.types';
import * as Notifications from 'expo-notifications';
import { ReturnType } from '@/utils/types/common-types';

export enum NotificationIdentifier {
  TASKS_TODAY = 'tasks-today',
  TASKS_TOMORROW = 'tasks-tomorrow',
}

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

const validateTaskReminderDate = (
  tasks: SupportedTaskFieldsForNotification[],
): ReturnType<boolean> => {
  tasks.forEach(task => {
    if (!task.reminder_date) {
      return [false, new Error('Reminder date is missing')];
    }

    if (typeof task.reminder_date !== 'number') {
      return [false, new Error('Reminder date is not a number')];
    }

    if (!dayjs.unix(task.reminder_date).isValid()) {
      return [false, new Error('Invalid reminder date')];
    }
  });

  return [true, null];
};

const generateMessageForTaskItem = (task: SupportedTaskFieldsForNotification): string => {
  return `• ${task.title} - ${dayjs.unix(task.reminder_date).format('H:mm a')}`;
};

export const generateMessageForTasks = (
  tasks: SupportedTaskFieldsForNotification[],
): ReturnType<string> => {
  const [isValid, error] = validateTaskReminderDate(tasks);
  if (error !== null) {
    return [null, error];
  }
  if (!isValid) {
    return [null, new Error('Reminder date is invalid')];
  }

  const taskItems = tasks.map(generateMessageForTaskItem);

  return [taskItems.join('\n'), null];
};

export const scheduleNotificationsForToday = async (
  tasks: SupportedTaskFieldsForNotification[],
): Promise<ReturnType<string | null>> => {
  const [message, error] = generateMessageForTasks(tasks);
  if (error !== null) {
    return [null, error];
  }

  const today = dayjs();
  let trigger: Date | null = null;
  const isBefore6AM = today.isBefore(today.hour(6));
  const isAfter6PM = today.isAfter(today.hour(18));
  if (isBefore6AM) {
    trigger = today.hour(6).add(1, 'minute').toDate();
  }

  if (isAfter6PM) {
    return [null, null];
  }

  const title = tasks.length === 1 ? 'Task due today' : `${tasks.length} tasks due today`;

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      identifier: NotificationIdentifier.TASKS_TODAY,
      content: {
        title,
        body: message,
        sound: true,
      },
      trigger,
    });

    return [notificationId, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error];
    }

    return [null, new Error('Something went wrong')];
  }
};

export const scheduleNotificationsForTomorrow = async (
  tasks: SupportedTaskFieldsForNotification[],
): Promise<ReturnType<string>> => {
  const [message, error] = generateMessageForTasks(tasks);
  if (error !== null) {
    return [null, error];
  }

  const today = dayjs();
  let trigger: Date | null = null;
  const isBefore6PM = today.isBefore(today.hour(18));
  if (isBefore6PM) {
    trigger = today.hour(18).add(1, 'minute').toDate();
  }

  const title = tasks.length === 1 ? 'Task due tomorrow' : `${tasks.length} tasks due tomorrow`;

  try {
    const notificationId = await Notifications.scheduleNotificationAsync({
      identifier: NotificationIdentifier.TASKS_TOMORROW,
      content: {
        title,
        body: message,
        sound: true,
      },
      trigger,
    });

    return [notificationId, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error];
    }

    return [null, new Error('Something went wrong')];
  }
};
