import { useNotification } from '@/hooks/useNotification';
import { ReactNode, createContext, useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { useNavigation } from 'expo-router';
import { TabName } from '@/app/(tabs)/_layout';
import { NotificationIdentifier } from '@/hooks/useNotification/useNotification.utils';

const NotificationsContext = createContext(null);

type NotificationsProviderProps = {
  children: ReactNode;
};
export default function NotificationsProvider({ children }: NotificationsProviderProps) {
  const { scheduleNotificationsForTasksToday } = useNotification();
  const navigation = useNavigation();

  useEffect(() => {
    // Listener for handling when the notification is clicked
    const subscription = Notifications.addNotificationResponseReceivedListener(response => {
      if (response.notification.request.identifier === NotificationIdentifier.TASKS_TODAY) {
        navigation.navigate(TabName.Todo as never);
      }
    });

    // Clean up the subscription when component unmounts
    return () => subscription.remove();
  }, []);

  useEffect(() => {
    scheduleNotificationsForTasksToday();
  }, []);

  return <NotificationsContext.Provider value={null}>{children}</NotificationsContext.Provider>;
}
