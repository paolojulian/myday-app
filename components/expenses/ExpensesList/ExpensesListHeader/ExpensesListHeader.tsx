import Container from '@/components/common/Container';
import Row from '@/components/common/Row';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import React from 'react';

function ExpensesListHeader() {
  return (
    <Container>
      <ThemedText variant="caps">Expenses</ThemedText>
      <Row>
        <ThemedText style={{ color: colors.slateGrey[300] }} variant="caps">
          May~
        </ThemedText>
        <ThemedText style={{ color: colors.slateGrey[300] }} variant="caps">
          June~
        </ThemedText>
        <ThemedText style={{ color: colors.black }} variant="caps">
          July~
        </ThemedText>
        <ThemedText style={{ color: colors.slateGrey[300] }} variant="caps">
          August~
        </ThemedText>
      </Row>
    </Container>
  );
}

export default ExpensesListHeader;
