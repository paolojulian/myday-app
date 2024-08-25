import Container from '@/components/common/Container';
import MainHeader from '@/components/common/MainHeader';
import { colors } from '@/constants/Colors';
import RemainingBudgetCard from '../../RemainingBudgetCard';

export default function ListHeaderComponent() {
  return (
    <>
      <MainHeader subtitle={'Expenses'} color={colors.v2.teal} />
      <Container style={{ gap: 8, marginBottom: 24 }}>
        <RemainingBudgetCard variant="horizontal" />
      </Container>
    </>
  );
}
