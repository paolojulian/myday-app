import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import TodoScreen from '../screens/TodoScreen';

const Tab = createBottomTabNavigator();

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator>
      <Tab.Screen name='Home' component={HomeScreen}></Tab.Screen>
      <Tab.Screen name='Calendar' component={CalendarScreen}></Tab.Screen>
      <Tab.Screen name='Add' component={() => null}></Tab.Screen>
      <Tab.Screen name='Expense' component={ExpenseScreen}></Tab.Screen>
      <Tab.Screen name='Todo' component={TodoScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}
