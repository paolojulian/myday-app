import { MaterialCommunityIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Row from '../../../common/Row';
import { colors } from '@/constants/Colors';

type ExpenseItemRightActionsProps = {
  onDelete: () => void;
};

export default function ExpenseItemRightActions({ onDelete }: ExpenseItemRightActionsProps) {
  return (
    <Row
      style={{
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <TouchableWithoutFeedback onPress={onDelete}>
        <View
          style={{
            width: 62,
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.primary[400],
          }}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={32}
            color={colors.primary[800]}
          ></MaterialCommunityIcons>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={onDelete}>
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
            name="trash-can"
            size={32}
            color={colors.primary[100]}
          ></MaterialCommunityIcons>
        </View>
      </TouchableWithoutFeedback>
    </Row>
  );
}
