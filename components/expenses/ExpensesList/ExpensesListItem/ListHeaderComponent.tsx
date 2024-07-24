import Container from '@/components/common/Container';
import Row from '@/components/common/Row';
import ThemedText from '@/components/common/ThemedText';
import EditBudgetCard from '../../EditBudgetCard';
import RemainingBudgetCard from '../../RemainingBudgetCard';

export default function ListHeaderComponent() {
  return (
    <Container style={{ gap: 8, marginBottom: 8 }}>
      <ThemedText variant="caps">Expenses</ThemedText>
      <Row style={{ gap: 8, height: 'auto' }}>
        <RemainingBudgetCard variant="horizontal" />
        <EditBudgetCard />
      </Row>
    </Container>
  );
}
