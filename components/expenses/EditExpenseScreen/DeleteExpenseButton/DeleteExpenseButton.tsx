import { RouteNames } from '@/app/_layout';
import { colors } from '@/constants/Colors';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useDeleteExpense } from '@/hooks/services/expense/useDeleteExpense';
import { useExpenseRecurredPayments } from '@/hooks/services/expense/useExpenseRecurredPayments';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { showDeleteAlert } from './DeleteExpenseButton.utils';

type DeleteExpenseButtonProps = {
  id: Expense['id'];
};

const today = new Date();

export default function DeleteExpenseButton({ id }: DeleteExpenseButtonProps) {
  const router = useRouter();
  const { data, isLoading } = useExpenseRecurredPayments(id, today);
  const { mutateAsync } = useDeleteExpense(id);

  const hasRecurredPayments: boolean = !!data && data.length > 0;

  const handlePress = () => {
    showDeleteAlert({
      hasRecurredPayments,
      onCancel: () => {
        console.log('Cancelled');
      },
      onConfirm: () => {
        mutateAsync();
        GlobalSnackbar.show({
          message: 'Expense deleted',
          type: 'success',
        });

        if (router.canGoBack()) {
          router.back();
        } else {
          router.push(RouteNames.Tabs);
        }
      },
    });
  };

  if (isLoading) {
    return null;
  }

  return (
    <MaterialCommunityIcons
      style={{ color: colors.v2.accent }}
      name={'trash-can'}
      size={32}
      onPress={handlePress}
    />
  );
}
