import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import {
  GestureHandlerRootView,
  Swipeable,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import { colors } from '../../utils/theme/colors';
import Row from '../common/Row';
import Stack from '../common/Stack';
import Typography from '../common/Typography';
import { ComponentProps } from 'react';

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
  };

  const renderRightActions: ComponentProps<
    typeof Swipeable
  >['renderRightActions'] = () => {
    return (
      <TouchableWithoutFeedback onPress={handleDelete}>
        <View
          style={{
            width: 62,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.danger,
          }}
        >
          <MaterialCommunityIcons
            name='trash-can'
            size={35}
            color={colors.primary[100]}
          ></MaterialCommunityIcons>
        </View>
      </TouchableWithoutFeedback>
    );
  };

  return (
    <GestureHandlerRootView>
      <Swipeable
        containerStyle={{
          backgroundColor: colors.danger,
        }}
        renderRightActions={renderRightActions}
        overshootFriction={9}
        friction={2}
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
      </Swipeable>
    </GestureHandlerRootView>
  );
}
