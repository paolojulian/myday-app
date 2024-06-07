import { colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import { selectionAsync } from 'expo-haptics';
import { ComponentProps, useState } from 'react';
import { TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Row from '../../../common/Row';
import Stack from '../../../common/Stack';
import ThemedText from '../../../common/ThemedText';

type TodoItemProps = {
  id: string;
  name: string;
  notes: string;
  dueDate?: string;
};

export default function TodoItem({ name, dueDate }: TodoItemProps) {
  const [isChecked, setChecked] = useState(false);

  const handlePress = () => {
    setChecked(prev => !prev);
  };

  const handleLongPress = () => {
    selectionAsync();
  };

  return (
    <TouchableHighlight
      style={{ borderRadius: 8 }}
      delayPressIn={400}
      onLongPress={handleLongPress}
      onPress={handlePress}
      activeOpacity={0.9}
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
          color={colors.black}
        />
        <Stack style={{ gap: 2, minHeight: 32, justifyContent: 'center' }}>
          <ThemedText variant="body1">{name}</ThemedText>
          {!!dueDate && <ThemedText style={{ color: colors.darkGrey }}>{dueDate}</ThemedText>}
        </Stack>
      </Row>
    </TouchableHighlight>
  );
}
