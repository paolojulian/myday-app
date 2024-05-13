import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DatabaseProvider from './src/providers/DatabaseProvider';

export default function App() {
  return (
    <GestureHandlerRootView>
      <DatabaseProvider>
        <NavigationContainer>
          <BottomTabNavigator />
        </NavigationContainer>
      </DatabaseProvider>
    </GestureHandlerRootView>
  );
}
