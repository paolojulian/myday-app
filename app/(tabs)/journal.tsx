import AppSafeAreaView from '@/components/common/AppSafeAreaView';
import MainHeader from '@/components/common/MainHeader';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { useJournal } from '@/hooks/services/journal/useJournal';

export default function JournalScreen() {
  const { data } = useJournal(new Date());
  console.log(data);
  return (
    <AppSafeAreaView>
      <MainHeader subtitle="Journal" color={colors.v2.red} />
      <ThemedView style={{ backgroundColor: colors.v2.black, flex: 1 }}></ThemedView>
    </AppSafeAreaView>
  );
}
