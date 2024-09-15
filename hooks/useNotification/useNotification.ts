import { getStoredNotificationId, storeNotificationId } from '@/utils/storage/notifications';
import { Alert } from 'react-native';
import { useTasksToday } from '../services/task/useTasksToday';
import {
  cancelNotification,
  scheduleNotificationsForToday,
  scheduleNotificationsForTomorrow,
} from './useNotification.utils';
import { useTasksTomorrow } from '../services/task/useTasksTomorrow';

const NOTIFICATION_KEY = {
  TODAY: 'today',
  TOMORROW: 'tomorrow',
};
const isProduction: boolean = process.env.NODE_ENV === 'production';

export const useNotification = () => {
  const { refetch: refetchTasksForToday } = useTasksToday();
  const { refetch: refetchTasksForTomorrow } = useTasksTomorrow();

  const scheduleNotificationsForTasksToday = async (): Promise<void> => {
    const { data: tasksToday } = await refetchTasksForToday();

    if (tasksToday === undefined || tasksToday.length === 0) {
      return;
    }

    const [storedNotificationId, getStoredNotificationIdError] = await getStoredNotificationId(
      NOTIFICATION_KEY.TODAY,
    );
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

    if (notificationId === null) {
      // No notifications was made
      return;
    }

    await storeNotificationId(NOTIFICATION_KEY.TODAY, notificationId);
  };

  const scheduleNotificationsForTasksTomorrow = async (): Promise<void> => {
    const { data: tasksTomorrow } = await refetchTasksForTomorrow();

    if (tasksTomorrow === undefined || tasksTomorrow.length === 0) {
      return;
    }

    const [storedNotificationId, getStoredNotificationIdError] = await getStoredNotificationId(
      NOTIFICATION_KEY.TOMORROW,
    );
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

    const [notificationId, error] = await scheduleNotificationsForTomorrow(tasksTomorrow);
    if (error !== null) {
      Alert.alert('Error', error.message);
      return;
    }

    await storeNotificationId(NOTIFICATION_KEY.TOMORROW, notificationId);
  };

  return { scheduleNotificationsForTasksToday, scheduleNotificationsForTasksTomorrow };
};
