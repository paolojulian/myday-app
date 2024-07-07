import Container from '@/components/common/Container';
import React from 'react';
import RemainingBudgetCard from './RemainingBudgetCard';
import TotalSpentTodayCard from './TotalSpentTodayCard';

function BudgetOverview() {
  return (
    <Container style={{ flexDirection: 'row', gap: 8 }}>
      <RemainingBudgetCard />
      <TotalSpentTodayCard />
    </Container>
  );
}

export default BudgetOverview;
