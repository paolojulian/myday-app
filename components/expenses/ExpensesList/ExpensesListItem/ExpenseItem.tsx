import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { selectionAsync } from 'expo-haptics';
import { ComponentProps } from 'react';
import { TouchableHighlight } from 'react-native';
import { Swipeable } from 'react-native-gesture-handler';
import ExpenseItemRightActions from './ExpenseItemRightActions';

type ExpenseItemProps = {
  onDelete: (id: string) => void;
  id: string;
  amount: number;
  date: string;
  name: string;
  notes: string;
};

export default function ExpenseItem({ onDelete, id, amount, date, name }: ExpenseItemProps) {
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
        borderRadius: 8,
        overflow: 'visible',
      }}
      renderRightActions={renderRightActions}
      overshootFriction={8}
      friction={2}
    >
      <TouchableHighlight
        style={{ borderRadius: 8 }}
        delayPressIn={400}
        onLongPress={handlePress}
        activeOpacity={0.9}
      >
        <Row
          style={{
            padding: 16,
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            borderRadius: 8,
            elevation: 16,
            shadowColor: colors.black,
            shadowOpacity: 0.1,
            shadowOffset: {
              width: 0,
              height: 3,
            },
            backgroundColor: colors.white,
          }}
        >
          <Stack>
            <ThemedText>{name}</ThemedText>
            <ThemedText style={{ color: colors.darkGrey }}>{date}</ThemedText>
          </Stack>
          <ThemedText style={{ color: colors.red }}>-${amount}</ThemedText>
        </Row>
      </TouchableHighlight>
    </Swipeable>
  );
}
