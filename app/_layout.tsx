import UpdateBudgetBottomSheet from '@/components/expenses/UpdateBudgetBottomSheet';
import { colors } from '@/constants/Colors';
import DefaultTheme from '@/constants/Theme';
import { useBackgroundFetch } from '@/hooks/useBackgroundFetch';
import { useCustomFonts } from '@/hooks/useCustomFonts';
import SnackbarManager from '@/managers/SnackbarManager';
import DatabaseProvider from '@/providers/DatabaseProvider';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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
  NotFound = '+not-found',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const { loaded: isFontsLoaded } = useCustomFonts();

  useBackgroundFetch();

  useEffect(() => {
    if (isFontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [isFontsLoaded]);

  if (!isFontsLoaded) {
    return null;
  }

  return (
    <>
      <StatusBar backgroundColor={colors.v2.black} style="dark" />
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DatabaseProvider>
          <QueryClientProvider client={queryClient}>
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
                <Stack.Screen options={{ headerShown: false }} name={RouteNames.NotFound} />
              </Stack>
            </ThemeProvider>
          </QueryClientProvider>
        </DatabaseProvider>
      </GestureHandlerRootView>
    </>
  );
}
