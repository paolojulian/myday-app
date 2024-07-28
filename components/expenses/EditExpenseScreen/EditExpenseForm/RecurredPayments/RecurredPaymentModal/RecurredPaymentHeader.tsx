import Row from '@/components/common/Row';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useDeleteExpense } from '@/hooks/services/expense/useDeleteExpense';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import { FC } from 'react';
import { Alert } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
    Alert.alert(
      'Delete Expense',
      'Are you sure you want to delete this expense?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: async () => {
            try {
              await mutateAsync();
              Alert.alert(
                'Expense Deleted',
                'This expense has been deleted successfully',
                [{ text: 'OK', onPress: onDeleteDone }],
                {
                  cancelable: false,
                },
              );

              onDeleteDone();
            } catch {
              GlobalSnackbar.show({
                message: 'Failed to delete expense',
                type: 'error',
              });
            }
          },
          style: 'destructive',
        },
      ],
      {
        cancelable: true,
      },
    );
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
