import Stack from '@/components/common/Stack';
import BudgetOverview from '@/components/home/BudgetOverview';
import HomeHeader from '@/components/home/HomeHeader';
import PriorityTaskList from '@/components/home/PriorityTaskList';
import RecentTransactions from '@/components/home/RecentTransactions';
import React from 'react';
import { ScrollView } from 'react-native';
import TasksOverview from './TasksOverview';

function HomeWorkArea() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <HomeHeader />
      <Stack style={{ gap: 8, flex: 1, paddingBottom: 24 }}>
        <TasksOverview />
        <BudgetOverview />
        <PriorityTaskList />
        <RecentTransactions />
      </Stack>
    </ScrollView>
  );
}

export default HomeWorkArea;
