import { useNotification } from '@/hooks/useNotification';
import { ReactNode, createContext, useEffect } from 'react';

const NotificationsContext = createContext(null);

type NotificationsProviderProps = {
  children: ReactNode;
};
export default function NotificationsProvider({ children }: NotificationsProviderProps) {
  const { scheduleNotificationsForTasksToday } = useNotification();

  useEffect(() => {
    scheduleNotificationsForTasksToday();
  }, []);

  return <NotificationsContext.Provider value={null}>{children}</NotificationsContext.Provider>;
}
