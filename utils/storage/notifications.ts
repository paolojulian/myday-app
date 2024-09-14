import { Task } from '@/hooks/services/task/task.types';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Store notification ID in local storage for a specific task
export const storeNotificationId = async (
  taskId: Task['id'],
  notificationId: string,
): Promise<void> => {
  await AsyncStorage.setItem(`notification-${taskId}`, notificationId);
};

// Retrieve notification ID for a specific task
export const getStoredNotificationId = async (
  taskId: Task['id'],
): Promise<[string | null, Error | null]> => {
  try {
    const notificationItem = await AsyncStorage.getItem(`notification-${taskId}`);

    return [notificationItem, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error];
    }

    return [null, new Error('Cannot retrieve notification ID')];
  }
};

// Remove notification ID when task is deleted or updated
export const removeNotificationId = async (taskId: Task['id']): Promise<void> => {
  await AsyncStorage.removeItem(`notification-${taskId}`);
};
