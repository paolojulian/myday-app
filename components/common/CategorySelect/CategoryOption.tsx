import { TouchableOpacity } from 'react-native';
import ThemedView from '../ThemedView';
import { colors } from '@/constants/Colors';
import ThemedText from '../ThemedText';

type RecurrenceOptionProps = {
  onPress: () => void;
  title: string;
  isSelected: boolean;
};

export default function CategoryOption({ onPress, title, isSelected }: RecurrenceOptionProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={{
          justifyContent: 'center',
          backgroundColor: isSelected ? colors.slateGrey[100] : colors.whiteSmoke,
          padding: 16,
        }}
      >
        <ThemedText style={{ textTransform: 'capitalize' }}>{title}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}
