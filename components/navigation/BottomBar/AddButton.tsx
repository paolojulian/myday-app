import { colors } from '@/constants/Colors';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

export type AddButtonProps = {
  onPress: () => void;
};

export default function AddButton({ onPress: onAddPress }: AddButtonProps) {
  return (
    <TouchableOpacity
      onPress={e => {
        e.preventDefault();
        onAddPress();
      }}
      style={{
        backgroundColor: colors.grey,
        width: 64,
        height: 64,
        padding: 8,
        borderRadius: 9999,
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <View
        style={{
          backgroundColor: colors.black,
          width: 48,
          height: 48,
          borderRadius: 9999,
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Ionicons name="add-outline" color={colors.white} size={32} />
      </View>
    </TouchableOpacity>
  );
}
