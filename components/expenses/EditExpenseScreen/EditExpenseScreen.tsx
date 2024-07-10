import { RouteNames } from '@/app/_layout';
import HeaderWithBackButton from '@/components/common/HeaderWithBackButton';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { SafeAreaView, ScrollView } from 'react-native';
import EditExpenseForm from './EditExpenseForm';

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
          RightComponent={
            <MaterialCommunityIcons
              style={{ color: colors.red }}
              name={'trash-can'}
              size={32}
              onPress={handleBackPress}
            />
          }
        />

        <ThemedView style={{ flex: 1, gap: 16 }}>
          <EditExpenseForm id={id} />
        </ThemedView>
      </ScrollView>
    </SafeAreaView>
  );
}
