import { colors } from '@/constants/Colors';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useDeleteExpense } from '@/hooks/services/expense/useDeleteExpense';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { showDeleteAlert } from './DeleteExpenseButton.utils';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { useRouter } from 'expo-router';
import { RouteNames } from '@/app/_layout';

type DeleteExpenseButtonProps = {
  id: Expense['id'];
};

export default function DeleteExpenseButton({ id }: DeleteExpenseButtonProps) {
  const router = useRouter();
  const { mutateAsync } = useDeleteExpense(id);

  const handlePress = () => {
    showDeleteAlert({
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

  return (
    <MaterialCommunityIcons
      style={{ color: colors.v2.accent }}
      name={'trash-can'}
      size={32}
      onPress={handlePress}
    />
  );
}
