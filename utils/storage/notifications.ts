import { Task } from '@/hooks/services/task/task.types';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ReturnType } from '../types/common-types';

// Store notification ID in local storage for a specific task
export const storeNotificationId = async (
  key: string,
  notificationId: string,
): Promise<ReturnType<null>> => {
  try {
    await AsyncStorage.setItem(`notification-${key}`, notificationId);

    return [null, null];
  } catch (error) {
    if (error instanceof Error) {
      return [null, error];
    }
    return [null, new Error('Cannot store notification ID')];
  }
};

// Retrieve notification ID for a specific task
export const getStoredNotificationId = async (key: string): Promise<ReturnType<string | null>> => {
  try {
    const notificationItem = await AsyncStorage.getItem(`notification-${key}`);

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
