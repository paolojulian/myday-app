import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useExpense } from '@/hooks/services/expense/useExpense';
import { useExpenseRecurredPayments } from '@/hooks/services/expense/useExpenseRecurredPayments';
import dayjs from 'dayjs';
import { useState } from 'react';
import { RecurredPaymentsHeader, RecurredPaymentsItem } from './RecurredPayments.style';
import RecurredPaymentModal from './RecurredPaymentModal';

type RecurredPaymentsProps = {
  id: Expense['id'];
};

const RecurredPayments: React.FC<RecurredPaymentsProps> = ({ id }) => {
  const [selectedRecurringItem, setSelectedRecurringItem] = useState<Expense | null>(null);
  const [filterDate, setFilterDate] = useState<Date>(new Date());
  const { data: expense } = useExpense(id);
  const { data: recurredPayments, isLoading } = useExpenseRecurredPayments(id, filterDate);

  if (!expense?.recurrence) {
    return null;
  }

  const shouldShowRecurredPaymentModal: boolean = !!selectedRecurringItem;
  const isLatestMonth: boolean = dayjs(filterDate)
    .startOf('month')
    .isSame(dayjs().startOf('month'));

  const handleCloseRecurredPaymentModal = (): void => setSelectedRecurringItem(null);

  const handlePrevMonthPress = (): void =>
    setFilterDate(prevDate => dayjs(prevDate).subtract(1, 'month').toDate());

  const handleNextMonthPress = (): void => {
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
        <RecurredPaymentsHeader
          onNextMonthPress={handleNextMonthPress}
          onPrevMonthPress={handlePrevMonthPress}
          selectedMonth={filterDate}
          shouldDisableNextMonth={isLatestMonth}
        />
        <Stack style={{ gap: 8 }}>
          {recurredPayments?.map(expense => (
            <RecurredPaymentsItem
              key={expense.id}
              onPress={() => setSelectedRecurringItem(expense)}
              amount={expense.amount}
              transactionDate_epoch={expense.transaction_date}
            />
          ))}
          {recurredPayments?.length === 0 && (
            <ThemedText style={{ paddingVertical: 8, color: colors.v2.grayLight }}>
              No recurred payments
            </ThemedText>
          )}
        </Stack>
      </Stack>
      <RecurredPaymentModal
        onClose={handleCloseRecurredPaymentModal}
        expense={selectedRecurringItem}
        isOpen={shouldShowRecurredPaymentModal}
      />
    </Container>
  );
};

export default RecurredPayments;
