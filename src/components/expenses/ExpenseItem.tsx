import { selectionAsync } from 'expo-haptics';
import { ComponentProps } from 'react';
import { TouchableHighlight } from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
} from 'react-native-gesture-handler';
import { colors } from '../../utils/theme/colors';
import Row from '../common/Row';
import Stack from '../common/Stack';
import Typography from '../common/Typography';
import ExpenseItemRightActions from './ExpenseItemRightActions';

type ExpenseItemProps = {
  onDelete: (id: string) => void;
  id: string;
  amount: number;
  date: string;
  name: string;
  notes: string;
};

export default function ExpenseItem({
  onDelete,
  id,
  amount,
  date,
  name,
  notes,
}: ExpenseItemProps) {
  const handleDelete = () => {
    onDelete(id);
    selectionAsync();
  };

  const handlePress = () => {
    selectionAsync();
  };
  const renderRightActions: ComponentProps<
    typeof Swipeable
  >['renderRightActions'] = () => {
    return <ExpenseItemRightActions onDelete={handleDelete} />;
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        containerStyle={{
          backgroundColor: colors.primary[400],
        }}
        renderRightActions={renderRightActions}
        overshootFriction={9}
        friction={2}
      >
        <TouchableHighlight
          delayPressIn={400}
          onLongPress={handlePress}
          activeOpacity={0.9}
        >
          <Row
            style={{
              padding: 16,
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              backgroundColor: colors.white,
            }}
          >
            <Stack>
              <Typography variant='body-lg'>{name}</Typography>
              <Typography>{date}</Typography>
            </Stack>
            <Typography variant='body-lg'>${amount}</Typography>
          </Row>
        </TouchableHighlight>
      </Swipeable>
    </GestureHandlerRootView>
  );
}
