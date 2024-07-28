import AddFactory from '@/components/add/AddFactory';
import { isSupportedAddType } from '@/components/add/utils';
import AppSafeAreaView from '@/components/common/AppSafeAreaView';
import Container from '@/components/common/Container';
import Tabs from '@/components/common/Tabs';
import { TabItem } from '@/components/common/Tabs/TabsItem';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export type SupportedAddItems = 'Expense' | 'Todo';

const ADD_TAB_ITEMS: TabItem<SupportedAddItems>[] = [
  {
    key: 'Expense',
    value: 'Expense',
  },
  {
    key: 'Todo',
    value: 'Todo',
  },
];

export default function AddScreen() {
  const { defaultType } = useLocalSearchParams<{ defaultType?: string }>();
  const resolvedDefaultType = isSupportedAddType(defaultType) ? defaultType : 'Expense';
  const [selectedItem, setSelectedItem] = useState<SupportedAddItems>(resolvedDefaultType);

  const navigation = useNavigation();
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <AppSafeAreaView edges={['top']}>
        <ThemedView style={styles.main}>
          <Container>
            <ThemedView style={styles.header}>
              <MaterialCommunityIcons name={'chevron-left'} size={32} onPress={handleBackPress} />
              <ThemedText variant="heading">Add</ThemedText>
              <MaterialCommunityIcons name={'chevron-left'} size={32} style={{ opacity: 0 }} />
            </ThemedView>
          </Container>

          <ThemedView style={{ flex: 1, gap: 16 }}>
            <Container>
              <Tabs<SupportedAddItems>
                onSelect={setSelectedItem}
                selectedItem={selectedItem}
                items={ADD_TAB_ITEMS}
              />
            </Container>

            <AddFactory type={selectedItem} />
          </ThemedView>
        </ThemedView>
      </AppSafeAreaView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    height: 'auto',
    position: 'relative',
  },
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  main: {
    flex: 1,
  },
});
