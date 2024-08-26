import { Alert } from 'react-native';

export function showDeleteAlert({
  onCancel,
  onConfirm,
  hasRecurredPayments,
}: {
  onCancel: () => void;
  onConfirm: () => void;
  hasRecurredPayments: boolean;
}) {
  const message = hasRecurredPayments
    ? 'This expense has recurred payments. Deleting it will not delete the recurred payments. If you want to delete the recurred payments, you can do so from the recurred payments section below.'
    : 'Are you sure you want to delete this expense?';

  Alert.alert(
    'Delete Expense',
    message,
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
