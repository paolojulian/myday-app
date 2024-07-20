import { TouchableOpacity } from 'react-native';
import ThemedView from '../ThemedView';
import { colors } from '@/constants/Colors';
import ThemedText from '../ThemedText';

type RecurrenceOptionProps = {
  title: string;
  onPress: () => void;
};

export default function RecurrenceOption({ onPress, title }: RecurrenceOptionProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      <ThemedView
        style={{
          justifyContent: 'center',
          backgroundColor: colors.whiteSmoke,
          padding: 16,
        }}
      >
        <ThemedText style={{ textTransform: 'capitalize' }}>{title}</ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}
