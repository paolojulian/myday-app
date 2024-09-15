import { RouteNames } from '@/app/_layout';
import { getDefaultTypeFromTabIndex } from '@/components/add/utils';
import BottomBar from '@/components/navigation/BottomBar/BottomBar';
import { TabName } from '@/utils/constants';
import { router, Tabs } from 'expo-router';
import React, { ComponentProps } from 'react';

/** Don't modify the arrangement of this array since it is used to get the current route from the navigation */
const tabs = [TabName.Home, TabName.Expense, TabName.Todo, TabName.Journal];

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: () => <></>,
      }}
      tabBar={TabBar}
    >
      {tabs.map(tab => (
        <Tabs.Screen key={tab} name={tab}></Tabs.Screen>
      ))}
    </Tabs>
  );
}

const TabBar: ComponentProps<typeof Tabs>['tabBar'] = props => {
  const { navigation } = props;

  const handleAddPress = () => {
    const defaultType = getDefaultTypeFromTabIndex(navigation.getState().index);
    router.push({
      pathname: RouteNames.Add as never,
      params: {
        defaultType: defaultType,
      },
    });
  };

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
