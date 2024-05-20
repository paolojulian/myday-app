import { TouchableHighlight, TouchableOpacity, View } from 'react-native';
import Row from '../common/Row';
import Stack from '../common/Stack';
import ThemedText from '../common/ThemedText';
import { colors } from '@/constants/Colors';

type TodoItemProps = {
  id: string;
  name: string;
  notes: string;
  reminderDate?: string;
};

export default function TodoItem({ id, name, notes, reminderDate }: TodoItemProps) {
  return (
    <TouchableHighlight>
      <Row
        style={{
          padding: 16,
          alignItems: 'flex-start',
          gap: 16,
        }}
      >
        <TouchableOpacity>
          <View
            style={{
              marginTop: 4,
              width: 24,
              height: 24,
              borderWidth: 1,
              borderColor: colors.primary[900],
              borderRadius: 9999,
            }}
          ></View>
        </TouchableOpacity>
        <Stack>
          <ThemedText variant="body-lg">{name}</ThemedText>
          {!!notes && <ThemedText>{notes}</ThemedText>}
          {!!reminderDate && <ThemedText>Reminder - {reminderDate}</ThemedText>}
        </Stack>
      </Row>
    </TouchableHighlight>
  );
}
