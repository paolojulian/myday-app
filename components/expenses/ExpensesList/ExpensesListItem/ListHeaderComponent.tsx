import Container from '@/components/common/Container';
import ChevronLeftIcon from '@/components/common/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/common/icons/ChevronRightIcon';
import MainHeader from '@/components/common/MainHeader';
import Row from '@/components/common/Row';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { TouchableOpacity, View } from 'react-native';
import RemainingBudgetCard from '../../RemainingBudgetCard';
import dayjs from 'dayjs';

type ListHeaderComponentProps = {
  onSetTransactionDate: (date: Date) => void;
  transactionDate: Date;
};

export default function ListHeaderComponent({
  onSetTransactionDate,
  transactionDate,
}: ListHeaderComponentProps) {
  const canViewNextMonth = dayjs().isAfter(dayjs(transactionDate), 'month');
  const handlePrevMonthPress = (): void => {
    onSetTransactionDate(dayjs(transactionDate).subtract(1, 'month').toDate());
  };
  const handleNextMonthPress = (): void => {
    if (!canViewNextMonth) return;

    onSetTransactionDate(dayjs(transactionDate).add(1, 'month').toDate());
  };

  return (
    <>
      <MainHeader subtitle={'Expenses'} color={colors.v2.teal} />
      <Container style={{ gap: 8, marginBottom: 24 }}>
        <Row style={{ flex: 1, marginVertical: 16 }}>
          <TouchableOpacity onPress={handlePrevMonthPress}>
            <ChevronLeftIcon />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ThemedText variant="header-md">{dayjs(transactionDate).format('MMMM')}</ThemedText>
          </View>
          <TouchableOpacity onPress={handleNextMonthPress} disabled={!canViewNextMonth}>
            <ChevronRightIcon />
          </TouchableOpacity>
        </Row>
        <RemainingBudgetCard variant="horizontal" />
      </Container>
    </>
  );
}
