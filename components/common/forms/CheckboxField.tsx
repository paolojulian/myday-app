import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import Checkbox from 'expo-checkbox';
import { TouchableOpacity } from 'react-native-gesture-handler';

type CheckboxFieldProps = {
  onValueChange: (value: boolean) => void;
  value: boolean;
  label: string;
};
export default function CheckboxField({ onValueChange, value, label }: CheckboxFieldProps) {
  const handlePress = () => {
    onValueChange(!value);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 8,
          paddingHorizontal: 24,
          paddingVertical: 16,
          backgroundColor: colors.whiteSmoke,
        }}
      >
        <Checkbox style={{ borderRadius: 4 }} value={value} color={colors.black} />
        <ThemedText variant="body1">{label}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}
