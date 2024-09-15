import { getStoredNotificationId, storeNotificationId } from '@/utils/storage/notifications';
import { Alert } from 'react-native';
import { useTasksToday } from '../services/task/useTasksToday';
import { cancelNotification, scheduleNotificationsForToday } from './useNotification.utils';

const TODAY_NOTIFICATION_KEY = 'today';
const isProduction: boolean = process.env.NODE_ENV === 'production';

export const useNotification = () => {
  const { refetch: refetchTasksForToday } = useTasksToday();
  // const { data: tasksTomorrow, isLoading: isLoadingTasksTomorrow } = useTasksTomorrow();

  const scheduleNotificationsForTasksToday = async (): Promise<void> => {
    const { data: tasksToday } = await refetchTasksForToday();

    if (tasksToday === undefined || tasksToday.length === 0) {
      return;
    }

    const [storedNotificationId, getStoredNotificationIdError] =
      await getStoredNotificationId(TODAY_NOTIFICATION_KEY);
    if (getStoredNotificationIdError !== null) {
      Alert.alert('Error', getStoredNotificationIdError.message);
      return;
    }

    if (!isProduction && storedNotificationId !== null) {
      await cancelNotification(storedNotificationId);
    }

    if (isProduction && storedNotificationId !== null) {
      // There is no need to schedule a notifiation because
      // there is already a scheduled notification for today
      return;
    }

    const [notificationId, error] = await scheduleNotificationsForToday(tasksToday);
    if (error !== null) {
      Alert.alert('Error', error.message);
      return;
    }

    await storeNotificationId(TODAY_NOTIFICATION_KEY, notificationId);
  };

  // const scheduleNotificationsForTasksTomorrow = async () => {};

  // const cancelNotificationForTask = async (taskId: Task['id']): Promise<void> => {
  //   const [notificationId, error] = await getStoredNotificationId(taskId);
  //   if (error !== null) {
  //     Alert.alert('Error', error.message);
  //     return;
  //   }
  //
  //   if (notificationId === null) {
  //     return;
  //   }
  //
  //   const [_, notificationError] = await cancelNotification(notificationId);
  //   if (notificationError !== null) {
  //     Alert.alert('Error', notificationError.message);
  //   }
  // };

  return { scheduleNotificationsForTasksToday };
};
