import { TouchableOpacity } from 'react-native';
import ThemedView from '../ThemedView';
import { colors } from '@/constants/Colors';
import ThemedText from '../ThemedText';

type RecurrenceOptionProps = {
  onPress: () => void;
  title: string;
  isSelected: boolean;
};

export default function RecurrenceOption({ onPress, title, isSelected }: RecurrenceOptionProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={{
          justifyContent: 'center',
          backgroundColor: isSelected ? colors.v2.accent : colors.v2.grayDark,
          padding: 16,
        }}
      >
        <ThemedText
          style={{
            textTransform: 'capitalize',
            color: isSelected ? colors.v2.black : colors.v2.white,
          }}
        >
          {title}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}
