import DefaultTheme from '@/constants/Theme';
import SnackbarManager from '@/managers/SnackbarManager';
import DatabaseProvider from '@/providers/DatabaseProvider';
import { ThemeProvider } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export enum RouteNames {
  Tabs = '(tabs)',
  Add = 'add',
  NotFound = '+not-found',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter.ttf'),
    Livic: require('../assets/fonts/Livvic-Regular.ttf'),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <DatabaseProvider>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider value={DefaultTheme}>
              <SnackbarManager />
              <Stack initialRouteName={RouteNames.Tabs}>
                <Stack.Screen name={RouteNames.Tabs} options={{ headerShown: false }} />
                <Stack.Screen
                  name={RouteNames.Add}
                  options={{ headerShown: false, presentation: 'modal', gestureEnabled: false }}
                />
                <Stack.Screen options={{ headerShown: false }} name={RouteNames.NotFound} />
              </Stack>
            </ThemeProvider>
          </QueryClientProvider>
        </DatabaseProvider>
      </GestureHandlerRootView>
    </>
  );
}
