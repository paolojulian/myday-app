import dayjs from 'dayjs';
import { Task } from '../services/task/task.types';
import * as Notifications from 'expo-notifications';

// This service handles all notification-related logic
export const scheduleNotification = async (task: Task): Promise<[string | null, Error | null]> => {
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

export const cancelNotification = async (notificationId: string): Promise<[null, Error | null]> => {
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
