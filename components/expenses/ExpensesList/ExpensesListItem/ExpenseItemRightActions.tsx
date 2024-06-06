import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';
import Row from '../../../common/Row';

type ExpenseItemRightActionsProps = {
  onDelete: () => void;
};

export default function ExpenseItemRightActions({ onDelete }: ExpenseItemRightActionsProps) {
  return (
    <Row
      style={{
        height: '100%',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingLeft: 24,
        alignItems: 'center',
        gap: 16,
      }}
    >
      <TouchableOpacity onPress={onDelete}>
        <View
          style={{
            width: 48,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.danger,
            borderRadius: 9999,
          }}
        >
          <MaterialCommunityIcons
            name="trash-can"
            size={28}
            color={colors.white}
          ></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
      <TouchableOpacity onPress={onDelete}>
        <View
          style={{
            width: 48,
            height: 48,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: colors.grey,
            borderRadius: 9999,
          }}
        >
          <MaterialCommunityIcons
            name="pencil"
            size={28}
            color={colors.white}
          ></MaterialCommunityIcons>
        </View>
      </TouchableOpacity>
    </Row>
  );
}
