import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CalendarScreen from '../screens/CalendarScreen';
import ExpenseScreen from '../screens/ExpenseScreen';
import TodoScreen from '../screens/TodoScreen';
import { Text, TouchableOpacity, View } from 'react-native';
import AddScreen from '../screens/AddScreen';

const Tab = createBottomTabNavigator();

enum TabName {
  Home = 'Home',
  Calendar = 'Calendar',
  Add = 'Add',
  Expense = 'Expense',
  Todo = 'Todo',
}

export default function BottomTabNavigator() {
  return (
    <Tab.Navigator
      tabBar={(props) => (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            padding: 8,
          }}
        >
          <TouchableOpacity
            onPress={() => props.navigation.navigate(TabName.Home)}
          >
            <Text>Home</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(TabName.Calendar)}
          >
            <Text>Calendar</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate('Add')}
            style={{
              bottom: 40, // space from bottombar
              backgroundColor: '#7d7d7d',
              width: 70,
              height: 70,
              borderRadius: 9999,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(TabName.Expense)}
          >
            <Text>Expense</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => props.navigation.navigate(TabName.Todo)}
          >
            <Text>Todo</Text>
          </TouchableOpacity>
        </View>
      )}
    >
      <Tab.Screen name={TabName.Home} component={HomeScreen}></Tab.Screen>
      <Tab.Screen
        name={TabName.Calendar}
        component={CalendarScreen}
      ></Tab.Screen>
      <Tab.Screen name={TabName.Add} component={AddScreen}></Tab.Screen>
      <Tab.Screen name={TabName.Expense} component={ExpenseScreen}></Tab.Screen>
      <Tab.Screen name={TabName.Todo} component={TodoScreen}></Tab.Screen>
    </Tab.Navigator>
  );
}
