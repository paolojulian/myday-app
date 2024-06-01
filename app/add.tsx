import AddFactory from '@/components/add/AddFactory';
import Tabs from '@/components/common/Tabs';
import ThemedView from '@/components/common/ThemedView';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';

export type SupportedAddItems = 'Expense' | 'Todo' | 'Journal';

export default function AddScreen() {
  const [selectedItem, setSelectedItem] = useState<SupportedAddItems>('Expense');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.main}>
        <Tabs<SupportedAddItems>
          onSelect={setSelectedItem}
          selectedItem={selectedItem}
          items={['Expense', 'Todo', 'Journal']}
        />

        <SafeAreaView>
          <ThemedView style={styles.formContainer}>
            <AddFactory type={selectedItem} />
          </ThemedView>
        </SafeAreaView>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 24,
  },
  main: {
    flex: 1,
    gap: 16,
  },
  formContainer: {
    gap: 8,
  },
});
