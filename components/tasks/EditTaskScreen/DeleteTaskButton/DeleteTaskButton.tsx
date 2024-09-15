import { RouteNames } from '@/app/_layout';
import { colors } from '@/constants/Colors';
import { Expense } from '@/hooks/services/expense/expense.types';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { showDeleteAlert } from './DeleteTaskButton.utils';
import { useDeleteTask } from '@/hooks/services/task/useDeleteTask';

type DeleteExpenseButtonProps = {
  id: Expense['id'];
};

export default function DeleteExpenseButton({ id }: DeleteExpenseButtonProps) {
  const router = useRouter();
  const { mutateAsync } = useDeleteTask(id);

  const handlePress = () => {
    showDeleteAlert({
      onCancel: () => {
        console.log('Cancelled');
      },
      onConfirm: async (): Promise<void> => {
        await mutateAsync();
        GlobalSnackbar.show({
          message: 'Task deleted',
          type: 'success',
        });

        if (router.canGoBack()) {
          router.back();
        } else {
          router.push(RouteNames.Tabs as never);
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
