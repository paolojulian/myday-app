import { useNotification } from '@/hooks/useNotification';
import { NotificationIdentifier } from '@/hooks/useNotification/useNotification.utils';
import { TabName } from '@/utils/constants';
import * as Notifications from 'expo-notifications';
import { useNavigation } from 'expo-router';
import { ReactNode, createContext, useEffect } from 'react';

const NotificationsContext = createContext(null);

type NotificationsProviderProps = {
  children: ReactNode;
};
export default function NotificationsProvider({ children }: NotificationsProviderProps) {
  const { scheduleNotificationsForTasksToday, scheduleNotificationsForTasksTomorrow } =
    useNotification();
  const navigation = useNavigation();

  useEffect(() => {
    // Listener for handling when the notification is clicked
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      if (response.notification.request.identifier === NotificationIdentifier.TASKS_TODAY) {
        navigation.navigate(TabName.Todo as never);
      }
      if (response.notification.request.identifier === NotificationIdentifier.TASKS_TOMORROW) {
        navigation.navigate(TabName.Todo as never);
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
