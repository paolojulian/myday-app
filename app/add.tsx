import Tabs from '@/components/common/Tabs';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';

type Items = 'Expense' | 'Todo' | 'Journal';

export default function AddScreen() {
  const [selectedItem, setSelectedItem] = useState<Items>('Expense');

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.main}>
        <Tabs<Items>
          onSelect={setSelectedItem}
          selectedItem={selectedItem}
          items={['Expense', 'Todo', 'Journal']}
        />
        <ThemedText variant="heading">Add Screen</ThemedText>
        <ThemedText>This is a sample modal</ThemedText>
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 24,
  },
  main: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxWidth: 960,
    marginHorizontal: 'auto',
  },
});
