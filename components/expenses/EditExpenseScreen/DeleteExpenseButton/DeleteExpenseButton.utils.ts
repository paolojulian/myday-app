import { Alert } from 'react-native';

export function showDeleteAlert({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  Alert.alert(
    'Delete Expense',
    'Are you sure you want to delete this expense?',
    [
      {
        text: 'Cancel',
        onPress: onCancel,
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: onConfirm,
        style: 'destructive',
      },
    ],
    {
      cancelable: true,
      onDismiss: onCancel,
    },
  );
}
