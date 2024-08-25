import { colors } from '@/constants/Colors';
import { Task } from '@/hooks/services/task/task.types';
import dayjs from 'dayjs';
import Checkbox from 'expo-checkbox';
import { selectionAsync } from 'expo-haptics';
import { useMemo, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Row from '../../../common/Row';
import Stack from '../../../common/Stack';
import ThemedText from '../../../common/ThemedText';

type SupportedTaskFields = Pick<
  Task,
  'id' | 'title' | 'description' | 'reminder_date' | 'is_completed'
>;

export type TaskItemProps = {
  onRemove: (id: number) => void;
  onRevert?: (id: number) => void; // This is optional, since not every page has revert function
  task: SupportedTaskFields;
};

export default function TaskItem({ onRemove, onRevert, task }: TaskItemProps) {
  const { id, title, reminder_date: reminderDate } = task;
  const [isChecked, setChecked] = useState<boolean>(!!task.is_completed);

  const formattedReminderDate = useMemo(
    () => (reminderDate ? dayjs.unix(reminderDate).format('MMM D, YYYY') : null),
    [reminderDate],
  );

  const handlePress = (): void => {
    selectionAsync();
    if (!!task.is_completed) {
      if (onRevert) onRevert(id);
      return;
    }

    setChecked(prev => {
      if (prev === false) {
        // If previous value is false, we are checking the item, so we need to remove it
        onRemove(id);
      }
      return !prev;
    });
  };

  const handleLongPress = () => {
    selectionAsync();
  };

  return (
    <TouchableOpacity
      style={{ borderRadius: 8 }}
      delayPressIn={400}
      onLongPress={handleLongPress}
      onPress={handlePress}
    >
      <Row
        style={{
          paddingHorizontal: 16,
          paddingVertical: 12,
          gap: 16,
          alignItems: 'center',
          borderRadius: 8,
          backgroundColor: colors.v2.grayDark,
        }}
      >
        <Checkbox
          style={{ borderRadius: 6 }}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? colors.v2.grayLight : colors.v2.grayLight}
        />
        <Stack style={{ gap: 2, minHeight: 32, justifyContent: 'center' }}>
          <ThemedText
            variant="header-sm"
            style={{
              textDecorationLine: isChecked ? 'line-through' : 'none',
              color: isChecked ? colors.v2.grayLight : colors.v2.white,
            }}
          >
            {title}
          </ThemedText>
          {!!formattedReminderDate && (
            <ThemedText
              style={{
                color: colors.v2.grayLight,
              }}
            >
              {formattedReminderDate}
            </ThemedText>
          )}
        </Stack>
      </Row>
    </TouchableOpacity>
  );
}
