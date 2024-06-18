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
    PoppinsRegular: require('../assets/fonts/Poppins/Poppins-Regular.ttf'),
    PoppinsMedium: require('../assets/fonts/Poppins/Poppins-Medium.ttf'),
    PoppinsSemiBold: require('../assets/fonts/Poppins/Poppins-SemiBold.ttf'),
    PoppinsBold: require('../assets/fonts/Poppins/Poppins-Bold.ttf'),
    LivvicRegular: require('../assets/fonts/Livvic/Livvic-Regular.ttf'),
    LivvicMedium: require('../assets/fonts/Livvic/Livvic-Medium.ttf'),
    LivvicSemiBold: require('../assets/fonts/Livvic/Livvic-SemiBold.ttf'),
    LivvicBold: require('../assets/fonts/Livvic/Livvic-Bold.ttf'),
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
                  options={{ headerShown: false, presentation: 'fullScreenModal' }}
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
