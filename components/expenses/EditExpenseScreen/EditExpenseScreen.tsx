import { RouteNames } from '@/app/_layout';
import AddExpenseForm from '@/components/add/AddExpenseForm';
import HeaderWithBackButton from '@/components/common/HeaderWithBackButton';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native';

export default function EditExpenseScreen() {
  const router = useRouter();

  const handleBackPress = () => {
    if (router.canGoBack()) {
      return router.back();
    }

    router.push(RouteNames.Tabs);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ paddingTop: 16 }}
      >
        <ThemedView style={{}}>
          <HeaderWithBackButton
            onBackPress={handleBackPress}
            title="Edit Expense"
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
            <AddExpenseForm />
          </ThemedView>
        </ThemedView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
