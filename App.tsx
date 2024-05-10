import { NavigationContainer } from '@react-navigation/native';
import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function App() {
  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}
