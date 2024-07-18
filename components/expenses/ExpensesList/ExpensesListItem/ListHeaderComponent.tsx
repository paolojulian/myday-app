import Stack from '@/components/common/Stack';
import ExpensesListHeader from '../ExpensesListHeader/ExpensesListHeader';
import Container from '@/components/common/Container';
import Row from '@/components/common/Row';
import RemainingBudgetCard from '../../RemainingBudgetCard';
import EditBudgetCard from '../../EditBudgetCard';

export default function ListHeaderComponent() {
  return (
    <Stack style={{ gap: 8, paddingBottom: 16 }}>
      <ExpensesListHeader />
      <Container>
        <Row style={{ gap: 8 }}>
          <RemainingBudgetCard variant="horizontal" />
          <EditBudgetCard />
        </Row>
      </Container>
    </Stack>
  );
}
