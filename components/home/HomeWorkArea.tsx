import ItemValueBentoCard from '@/components/common/BentoCard/ItemValueBentoCard';
import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import BudgetDetails from '@/components/home/BudgetDetails';
import HomeHeader from '@/components/home/HomeHeader';
import PriorityTaskList from '@/components/home/PriorityTaskList';
import RecentTransactions from '@/components/home/RecentTransactions';
import React from 'react';
import { ScrollView } from 'react-native';

function HomeWorkArea() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <HomeHeader />
      <Stack style={{ gap: 8, flex: 1, paddingBottom: 24 }}>
        <Container style={{ flexDirection: 'row', gap: 8 }}>
          <ItemValueBentoCard value={14} label="Total Tasks" />
          <ItemValueBentoCard value={4} label="Due Today" />
          <ItemValueBentoCard value={2} label="Overdue" />
        </Container>
        <BudgetDetails />
        <PriorityTaskList />
        <RecentTransactions />
      </Stack>
    </ScrollView>
  );
}

export default HomeWorkArea;
