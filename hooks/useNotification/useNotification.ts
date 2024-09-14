import { getStoredNotificationId } from '@/utils/storage/notifications';
import { Task } from '../services/task/task.types';
import { cancelNotification, scheduleNotification } from './useNotification.utils';
import { Alert } from 'react-native';

export const useNotification = () => {
  const scheduleNotificationForTask = async (task: Task) => {
    const [notificationId, error] = await scheduleNotification(task);
    if (error !== null) {
      Alert.alert('Error', error.message);
      return;
    }

    if (notificationId === null) {
      return;
    }
  };

  const cancelNotificationForTask = async (taskId: Task['id']): Promise<void> => {
    const [notificationId, error] = await getStoredNotificationId(taskId);
    if (error !== null) {
      Alert.alert('Error', error.message);
      return;
    }

    if (notificationId === null) {
      return;
    }

    const [_, notificationError] = await cancelNotification(notificationId);
    if (notificationError !== null) {
      Alert.alert('Error', notificationError.message);
    }
  };

  return { scheduleNotificationForTask, cancelNotificationForTask };
};
