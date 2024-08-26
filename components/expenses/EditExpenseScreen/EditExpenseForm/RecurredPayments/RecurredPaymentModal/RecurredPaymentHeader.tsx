import Row from '@/components/common/Row';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useDeleteExpense } from '@/hooks/services/expense/useDeleteExpense';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { FC } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { showDeleteExpenseConfirmation } from './RecurredPaymentHeader.utils';

type RecurredPaymentModalProps = {
  onDeleteDone: () => void;
  expense: Expense;
};
export const RecurredPaymentModalHeader: FC<RecurredPaymentModalProps> = ({
  onDeleteDone,
  expense,
}) => {
  const { mutateAsync } = useDeleteExpense(expense.id);

  const handleDeletePress = () => {
    showDeleteExpenseConfirmation({
      deleteExpenseAsync: mutateAsync,
      onDeleteDone,
    });
  };

  return (
    <Row style={{ justifyContent: 'center', alignItems: 'center' }}>
      <MaterialCommunityIcons
        style={{ pointerEvents: 'none', opacity: 0 }}
        name={'trash-can'}
        size={32}
        disabled={true}
      />
      <ThemedText style={{ flex: 1, textAlign: 'center' }} variant="body2">
        {dayjs.unix(expense.transaction_date).format('MMM D')}
      </ThemedText>
      <TouchableOpacity onPress={handleDeletePress}>
        <MaterialCommunityIcons style={{ color: colors.danger }} name={'trash-can'} size={32} />
      </TouchableOpacity>
    </Row>
  );
};
