import UpdateBudgetBottomSheet from '@/components/expenses/UpdateBudgetBottomSheet';
import { colors } from '@/constants/Colors';
import DefaultTheme from '@/constants/Theme';
import { useBackgroundFetch } from '@/hooks/useBackgroundFetch';
import { useCustomFonts } from '@/hooks/useCustomFonts';
import { usePreloadImages } from '@/hooks/usePreloadImages/usePreloadImages';
import SnackbarManager from '@/managers/SnackbarManager';
import DatabaseProvider from '@/providers/DatabaseProvider';
import NotificationsProvider from '@/providers/NotificationsProvider/NotificationsProvider';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import * as Notifications from 'expo-notifications';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export enum RouteNames {
  Tabs = '(tabs)',
  Add = 'add',
  Edit = 'expense/[id]',
  EditTask = 'task/[id]',
  Settings = 'settings',
  NotFound = '+not-found',
}

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const { loaded: isFontsLoaded } = useCustomFonts();
  const { areImagesReady } = usePreloadImages();

  const isPreloadFinished: boolean = isFontsLoaded && areImagesReady;
  useBackgroundFetch();

  useEffect(() => {
    if (isPreloadFinished) {
      SplashScreen.hideAsync();
    }
  }, [isPreloadFinished]);

  if (!isPreloadFinished) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={colors.v2.black} style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DatabaseProvider>
          <QueryClientProvider client={queryClient}>
            <NotificationsProvider>
              <ThemeProvider value={DefaultTheme}>
                <SnackbarManager />
                <UpdateBudgetBottomSheet />
                <Stack initialRouteName={RouteNames.Tabs}>
                  <Stack.Screen name={RouteNames.Tabs} options={{ headerShown: false }} />
                  <Stack.Screen
                    name={RouteNames.Add}
                    options={{ headerShown: false, presentation: 'fullScreenModal' }}
                  />
                  <Stack.Screen name={RouteNames.Edit} options={{ headerShown: false }} />
                  <Stack.Screen name={RouteNames.EditTask} options={{ headerShown: false }} />
                  <Stack.Screen name={RouteNames.Settings} options={{ headerShown: false }} />
                  <Stack.Screen options={{ headerShown: false }} name={RouteNames.NotFound} />
                </Stack>
              </ThemeProvider>
            </NotificationsProvider>
          </QueryClientProvider>
        </DatabaseProvider>
      </GestureHandlerRootView>
    </>
  );
}
