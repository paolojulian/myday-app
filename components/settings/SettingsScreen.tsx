import AppSafeAreaView from '@/components/common/AppSafeAreaView';
import { ReactElement } from 'react';
import HeaderWithBackButton from '../common/HeaderWithBackButton';
import ThemedView from '../common/ThemedView';

export default function SettingsScreen(): ReactElement {
  const handleBackPress = (): void => {};

  return (
    <AppSafeAreaView edges={['top']}>
      <HeaderWithBackButton onBackPress={handleBackPress} title="Settings" />
      <ThemedView style={{ flex: 1, gap: 16, marginBottom: 24 }}></ThemedView>
    </AppSafeAreaView>
  );
}
