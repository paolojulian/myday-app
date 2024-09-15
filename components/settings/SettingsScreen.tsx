import AppSafeAreaView from '@/components/common/AppSafeAreaView';
import { ReactElement } from 'react';
import HeaderWithBackButton from '../common/HeaderWithBackButton';
import ThemedView from '../common/ThemedView';
import { useRouter } from 'expo-router';
import { RouteNames } from '@/app/_layout';

export default function SettingsScreen(): ReactElement {
  const router = useRouter();

  const handleBackPress = (): void => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.navigate(RouteNames.Tabs as never);
  };

  return (
    <AppSafeAreaView edges={['top']}>
      <HeaderWithBackButton onBackPress={handleBackPress} title="Settings" />
      <ThemedView style={{ flex: 1, gap: 16, marginBottom: 24 }}></ThemedView>
    </AppSafeAreaView>
  );
}
