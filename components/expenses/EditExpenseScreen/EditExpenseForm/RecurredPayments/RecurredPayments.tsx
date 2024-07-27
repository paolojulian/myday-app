import Container from '@/components/common/Container';
import ChevronLeftIcon from '@/components/common/icons/ChevronLeftIcon';
import ChevronRightIcon from '@/components/common/icons/ChevronRightIcon';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useExpense } from '@/hooks/services/expense/useExpense';
import { useExpenseRecurredPayments } from '@/hooks/services/expense/useExpenseRecurredPayments';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { convertEpochToDate } from '@/utils/date/date.utils';
import dayjs from 'dayjs';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

type RecurredPaymentsProps = {
  id: Expense['id'];
};

const RecurredPayments: React.FC<RecurredPaymentsProps> = ({ id }) => {
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const { data: expense } = useExpense(id);
  const { data: recurredPayments, isLoading } = useExpenseRecurredPayments(id, filterDate);

  if (!expense?.recurrence) {
    return null;
  }

  const isLatestMonth = dayjs(filterDate).startOf('month').isSame(dayjs().startOf('month'));

  const handlePrevMonthPress = () => {
    setFilterDate(prevDate => dayjs(prevDate).subtract(1, 'month').toDate());
  };

  const handleNextMonthPress = () => {
    if (isLatestMonth) {
      return;
    }
    setFilterDate(prevDate => dayjs(prevDate).add(1, 'month').toDate());
  };

  if (isLoading) {
    return null; // TODO: add skeleton loader
  }

  return (
    <Container>
      <Stack style={{ gap: 8 }}>
        <Row style={{ justifyContent: 'space-between' }}>
          <ThemedText variant="body2">Recurred Payments</ThemedText>
          <Row style={{ alignItems: 'center', gap: 8 }}>
            <TouchableOpacity onPress={handlePrevMonthPress}>
              <ChevronLeftIcon />
            </TouchableOpacity>
            <ThemedText variant="body2">{dayjs(filterDate).format('MMM')}</ThemedText>
            <TouchableOpacity
              style={{
                opacity: isLatestMonth ? 0.25 : 1,
              }}
              onPress={handleNextMonthPress}
              disabled={isLatestMonth}
            >
              <ChevronRightIcon />
            </TouchableOpacity>
          </Row>
        </Row>
        <Stack style={{ gap: 8 }}>
          {recurredPayments?.map(({ transaction_date, amount }) => (
            <ThemedView
              style={{
                borderWidth: 1,
                borderColor: colors.slateGrey[200],
                borderRadius: 8,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 16,
              }}
            >
              <ThemedText style={{ color: colors.darkGrey }}>
                {convertEpochToDate(transaction_date).format('D MMM YYYY')}
              </ThemedText>
              <ThemedText style={{ color: colors.red }}>
                -{toLocaleCurrencyFormat(amount)}
              </ThemedText>
            </ThemedView>
          ))}
          {recurredPayments?.length === 0 && (
            <ThemedText style={{ paddingVertical: 8, color: colors.slateGrey[500] }}>
              No recurred payments
            </ThemedText>
          )}
        </Stack>
      </Stack>
    </Container>
  );
};

export default RecurredPayments;
