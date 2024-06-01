import { selectionAsync } from 'expo-haptics';
import { ComponentProps } from 'react';
import { TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import Row from '../common/Row';
import Stack from '../common/Stack';
import ThemedText from '../common/ThemedText';
import ExpenseItemRightActions from './ExpenseItemRightActions';
import { colors } from '@/constants/Colors';

type ExpenseItemProps = {
  onDelete: (id: string) => void;
  id: string;
  amount: number;
  date: string;
  name: string;
  notes: string;
};

export default function ExpenseItem({ onDelete, id, amount, date, name, notes }: ExpenseItemProps) {
  const handleDelete = () => {
    onDelete(id);
    selectionAsync();
  };

  const handlePress = () => {
    selectionAsync();
  };
  const renderRightActions: ComponentProps<typeof Swipeable>['renderRightActions'] = () => {
    return <ExpenseItemRightActions onDelete={handleDelete} />;
  };

  return (
    <Swipeable
      containerStyle={{
        backgroundColor: colors.primary[400],
      }}
      renderRightActions={renderRightActions}
      overshootFriction={9}
      friction={2}
    >
      <TouchableHighlight delayPressIn={400} onLongPress={handlePress} activeOpacity={0.9}>
        <Row
          style={{
            padding: 16,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            backgroundColor: colors.white,
          }}
        >
          <Stack>
            <ThemedText variant="body2">{name}</ThemedText>
            <ThemedText>{date}</ThemedText>
          </Stack>
          <ThemedText variant="body2">${amount}</ThemedText>
        </Row>
      </TouchableHighlight>
    </Swipeable>
  );
}
