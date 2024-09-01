import { Alert } from 'react-native';

export function showDeleteAlert({
  onCancel,
  onConfirm,
}: {
  onCancel: () => void;
  onConfirm: () => void;
}) {
  const message = 'Are you sure you want to delete this task?';

  Alert.alert(
    'Delete Task',
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
