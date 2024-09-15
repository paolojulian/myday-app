import { useNotification } from '@/hooks/useNotification';
import { NotificationIdentifier } from '@/hooks/useNotification/useNotification.utils';
import { TabName } from '@/utils/constants';
import * as Notifications from 'expo-notifications';
import { useRouter } from 'expo-router';
import { ReactNode, createContext, useEffect } from 'react';

const NotificationsContext = createContext(null);

type NotificationsProviderProps = {
  children: ReactNode;
};
export default function NotificationsProvider({ children }: NotificationsProviderProps) {
  const { scheduleNotificationsForTasksToday, scheduleNotificationsForTasksTomorrow } =
    useNotification();
  const router = useRouter();

  useEffect(() => {
    // Listener for handling when the notification is clicked
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      if (response.notification.request.identifier === NotificationIdentifier.TASKS_TODAY) {
        router.push({
          pathname: TabName.Todo as never,
          params: {
            filter: 'Today',
          },
        });
      }
      if (response.notification.request.identifier === NotificationIdentifier.TASKS_TOMORROW) {
        router.push({
          pathname: TabName.Todo as never,
          params: {
            filter: 'Tomorrow',
          },
        });
      }
    });

    // Clean up the subscription when component unmounts
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    scheduleNotificationsForTasksToday();
    scheduleNotificationsForTasksTomorrow();
  }, []);

  return <NotificationsContext.Provider value={null}>{children}</NotificationsContext.Provider>;
}
