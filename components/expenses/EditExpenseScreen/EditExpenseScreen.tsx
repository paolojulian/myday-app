import { RouteNames } from '@/app/_layout';
import HeaderWithBackButton from '@/components/common/HeaderWithBackButton';
import ThemedView from '@/components/common/ThemedView';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';
import DeleteExpenseButton from './DeleteExpenseButton';
import EditExpenseForm from './EditExpenseForm';
import RecurredPayments from './EditExpenseForm/RecurredPayments';

type SearchParams = {
  id: string;
};

export default function EditExpenseScreen() {
  const router = useRouter();
  const searchParams = useLocalSearchParams<SearchParams>();
  const id = Number(searchParams.id);

  const handleBackPress = () => {
    if (router.canGoBack()) {
      return router.back();
    }

    router.push(RouteNames.Tabs);
  };

  if (!id) {
    return null;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }} stickyHeaderIndices={[0]} keyboardShouldPersistTaps="never">
        <HeaderWithBackButton
          onBackPress={handleBackPress}
          title="Expense"
          RightComponent={<DeleteExpenseButton id={id} />}
        />

        <ThemedView style={{ flex: 1, gap: 16 }}>
          <EditExpenseForm id={id} />
          <RecurredPayments id={id} />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
