import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import RemainingBudgetCard from '../../RemainingBudgetCard';

export default function ListHeaderComponent() {
  return (
    <Container style={{ gap: 8, marginBottom: 8 }}>
      <ThemedText variant="caps">Expenses</ThemedText>
      <RemainingBudgetCard variant="horizontal" />
    </Container>
  );
}
