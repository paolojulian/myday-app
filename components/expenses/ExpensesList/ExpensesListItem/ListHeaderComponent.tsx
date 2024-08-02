import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import RemainingBudgetCard from '../../RemainingBudgetCard';
import ExpenseChart from '../../ExpenseChart';
import { View } from 'react-native';

export default function ListHeaderComponent() {
  return (
    <>
      <View>
        <Container style={{ gap: 8 }}>
          <ThemedText variant="caps">Expenses</ThemedText>
          <RemainingBudgetCard variant="horizontal" />
        </Container>
        <ExpenseChart />
      </View>
    </>
  );
}
