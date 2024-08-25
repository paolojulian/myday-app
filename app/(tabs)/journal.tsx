import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { useJournal } from '@/hooks/services/journal/useJournal';

export default function JournalScreen() {
  const { data } = useJournal(new Date());
  console.log(data);
  return (
    <ThemedView style={{ backgroundColor: colors.v2.black, flex: 1 }}>
      <ThemedText variant="heading">Journal</ThemedText>
    </ThemedView>
  );
}
