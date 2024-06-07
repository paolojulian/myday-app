import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';

const HEIGHT = 140;

export default function TodoHeader() {
  return (
    <ThemedView
      style={{
        backgroundColor: colors.black,
        height: HEIGHT,
      }}
    ></ThemedView>
  );
}
