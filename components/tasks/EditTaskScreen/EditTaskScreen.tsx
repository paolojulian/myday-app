import { RouteNames } from '@/app/_layout';
import AppSafeAreaView from '@/components/common/AppSafeAreaView';
import HeaderWithBackButton from '@/components/common/HeaderWithBackButton';
import ThemedView from '@/components/common/ThemedView';
import DeleteExpenseButton from '@/components/expenses/EditExpenseScreen/DeleteExpenseButton';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ReactElement } from 'react';
import { ScrollView } from 'react-native';

type SearchParams = {
  id: string;
};

const EditTaskScreen = (): ReactElement | null => {
  const router = useRouter();
  const searchParams = useLocalSearchParams<SearchParams>();
  const id: number = Number(searchParams.id);

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
    <AppSafeAreaView>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="never">
        <HeaderWithBackButton
          onBackPress={handleBackPress}
          title="Expense"
          RightComponent={<DeleteExpenseButton id={id} />}
        />

        <ThemedView style={{ flex: 1, gap: 16, marginBottom: 24 }}></ThemedView>
      </ScrollView>
    </AppSafeAreaView>
  );
};

export default EditTaskScreen;
