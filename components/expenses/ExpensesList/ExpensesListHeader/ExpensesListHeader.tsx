import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import React from 'react';

function ExpensesListHeader() {
  return (
    <Container>
      <ThemedText variant="caps">Expenses</ThemedText>
    </Container>
  );
}

export default ExpensesListHeader;
