import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { UseMutateAsyncFunction } from '@tanstack/react-query';
import { Alert } from 'react-native';

export const showDeleteExpenseConfirmation = ({
  onDeleteDone,
  deleteExpenseAsync,
}: {
  onDeleteDone: () => void;
  deleteExpenseAsync: UseMutateAsyncFunction;
}): void => {
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
            await deleteExpenseAsync();
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
