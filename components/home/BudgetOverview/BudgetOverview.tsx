import Container from '@/components/common/Container';
import React from 'react';
import TotalSpentTodayCard from './TotalSpentTodayCard';
import RemainingBudgetCard from '@/components/expenses/RemainingBudgetCard';
import { View } from 'react-native';

function BudgetOverview() {
  return (
    <Container style={{ flexDirection: 'row', gap: 8 }}>
      <View style={{ flex: 1 }}>
        <RemainingBudgetCard variant="vertical" />
      </View>
      <View style={{ flex: 1 }}>
        <TotalSpentTodayCard />
      </View>
    </Container>
  );
}

export default BudgetOverview;
