import { colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import { selectionAsync } from 'expo-haptics';
import { useRef, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import Row from '../../../common/Row';
import Stack from '../../../common/Stack';
import ThemedText from '../../../common/ThemedText';
import dayjs from 'dayjs';

export type TaskItemProps = {
  onRemove: (id: number) => void;
  id: number;
  name: string;
  notes: string;
  reminderDate?: number | null;
};

const TIME_BEFORE_REMOVED_MS = 3000;

export default function TaskItem({ onRemove, id, name, reminderDate }: TaskItemProps) {
  const [isChecked, setChecked] = useState(false);
  const isBeingRemovedTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const formattedReminderDate = reminderDate
    ? dayjs.unix(reminderDate).format('MMM D, YYYY')
    : null;

  const prepareForRemoval = () => {
    cancelRemoval();
    // prepare for removal, make the whole thing less visible, then after 5000ms, call the remove function
    isBeingRemovedTimeoutRef.current = setTimeout(() => {
      onRemove(id);
    }, TIME_BEFORE_REMOVED_MS);
  };

  const cancelRemoval = () => {
    if (isBeingRemovedTimeoutRef.current) {
      clearTimeout(isBeingRemovedTimeoutRef.current);
    }
  };

  const handlePress = () => {
    selectionAsync();
    setChecked(prev => {
      if (prev === false) {
        // If previous value is false, we are checking the item, so we should prepare for removal
        prepareForRemoval();
      } else {
        // If previous value is true, we are unchecking the item, so we should cancel the removal
        cancelRemoval();
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
          padding: 16,
          gap: 16,
          alignItems: 'center',
          borderRadius: 8,
          elevation: 16,
          shadowColor: colors.black,
          shadowOpacity: 0.1,
          shadowOffset: {
            width: 0,
            height: 2,
          },
          backgroundColor: colors.white,
        }}
      >
        <Checkbox
          style={{ borderRadius: 6 }}
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? colors.grey : colors.black}
        />
        <Stack style={{ gap: 2, minHeight: 32, justifyContent: 'center' }}>
          <ThemedText
            variant="body2"
            style={{
              textDecorationLine: isChecked ? 'line-through' : 'none',
              color: isChecked ? colors.grey : colors.black,
            }}
          >
            {name}
          </ThemedText>
          {!!formattedReminderDate && (
            <ThemedText
              style={{
                color: isChecked ? colors.grey : colors.darkGrey,
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
