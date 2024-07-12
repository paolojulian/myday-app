import Container from '@/components/common/Container';
import React from 'react';
import TotalSpentTodayCard from './TotalSpentTodayCard';
import RemainingBudgetCard from '@/components/expenses/RemainingBudgetCard';

function BudgetOverview() {
  return (
    <Container style={{ flexDirection: 'row', gap: 8 }}>
      <RemainingBudgetCard variant="vertical" />
      <TotalSpentTodayCard />
    </Container>
  );
}

export default BudgetOverview;
