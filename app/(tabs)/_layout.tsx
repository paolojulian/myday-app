import BottomBar from '@/components/navigation/BottomBar/BottomBar';
import { router, Tabs } from 'expo-router';
import React, { ComponentProps } from 'react';

import { SafeAreaView } from 'react-native';

enum TabName {
  Home = 'index',
  Journal = 'journal',
  Add = 'add',
  Expense = 'expenses',
  Todo = 'todos',
}

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <SafeAreaView></SafeAreaView>,
      }}
      tabBar={TabBar}
    >
      <Tabs.Screen name={TabName.Home}></Tabs.Screen>
      <Tabs.Screen name={TabName.Journal}></Tabs.Screen>
      <Tabs.Screen name={TabName.Add}></Tabs.Screen>
      <Tabs.Screen name={TabName.Expense}></Tabs.Screen>
      <Tabs.Screen name={TabName.Todo}></Tabs.Screen>
    </Tabs>
  );
}

const TabBar: ComponentProps<typeof Tabs>['tabBar'] = props => {
  const { navigation } = props;

  const handleAddPress = () => router.push('add');
  const handleHomePress = () => navigation.navigate(TabName.Home);
  const handleTodoPress = () => navigation.navigate(TabName.Todo);
  const handleJournalPress = () => navigation.navigate(TabName.Journal);
  const handleExpensePress = () => navigation.navigate(TabName.Expense);

  return (
    <BottomBar
      onAddPress={handleAddPress}
      onHomePress={handleHomePress}
      onTodoPress={handleTodoPress}
      onJournalPress={handleJournalPress}
      onExpensePress={handleExpensePress}
    />
  );
};
