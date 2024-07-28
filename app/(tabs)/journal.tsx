import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { useJournal } from '@/hooks/services/journal/useJournal';

export default function JournalScreen() {
  const { data } = useJournal(new Date());
  console.log(data);
  return (
    <ThemedView>
      <ThemedText variant="heading">Journal</ThemedText>
    </ThemedView>
  );
}
