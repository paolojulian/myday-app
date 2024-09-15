import Container from '@/components/common/Container';
import ChevronLeftIcon from '@/components/common/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/common/icons/ChevronRightIcon';
import Row from '@/components/common/Row';
import ThemedText from '@/components/common/ThemedText';
import dayjs from 'dayjs';
import { TouchableOpacity, View } from 'react-native';
import RemainingBudgetCard from '../../RemainingBudgetCard';

type ListHeaderComponentProps = {
  onSetTransactionDate: (date: Date) => void;
  transactionDate: Date;
};

export default function ListHeaderComponent({
  onSetTransactionDate,
  transactionDate,
}: ListHeaderComponentProps) {
  //#region callbacks ==============================
  const handlePrevMonthPress = (): void => {
    onSetTransactionDate(dayjs(transactionDate).subtract(1, 'month').toDate());
  };
  const handleNextMonthPress = (): void => {
    if (!canViewNextMonth) return;

    onSetTransactionDate(dayjs(transactionDate).add(1, 'month').toDate());
  };
  //#endregion callbacks

  //#region computed ==============================
  const canViewNextMonth: boolean = dayjs().isAfter(dayjs(transactionDate), 'month');
  //#endregion computed

  return (
    <>
      <Container style={{ gap: 8, marginBottom: 24 }}>
        <Row style={{ flex: 1, marginVertical: 16 }}>
          <TouchableOpacity onPress={handlePrevMonthPress}>
            <ChevronLeftIcon />
          </TouchableOpacity>
          <View style={{ flex: 1, alignItems: 'center' }}>
            <ThemedText variant="header-md">{dayjs(transactionDate).format('MMMM')}</ThemedText>
          </View>
          {canViewNextMonth && (
            <TouchableOpacity onPress={handleNextMonthPress} disabled={!canViewNextMonth}>
              <ChevronRightIcon />
            </TouchableOpacity>
          )}
        </Row>
        <RemainingBudgetCard transactionDate={transactionDate} variant="horizontal" />
      </Container>
    </>
  );
}
