import DatabaseProvider from '@/providers/DatabaseProvider';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { useColorScheme } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import 'react-native-reanimated';

export enum RouteNames {
  Tabs = '(tabs)',
  Add = 'add',
  NotFound = '+not-found',
}

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('../assets/fonts/Inter.ttf'),
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
    <GestureHandlerRootView>
      <DatabaseProvider>
        <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
          <Stack initialRouteName={RouteNames.Tabs}>
            <Stack.Screen name={RouteNames.Tabs} options={{ headerShown: false }} />
            <Stack.Screen
              name={RouteNames.Add}
              options={{ headerShown: false, presentation: 'modal' }}
            />
            <Stack.Screen options={{ headerShown: false }} name={RouteNames.NotFound} />
          </Stack>
        </ThemeProvider>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
