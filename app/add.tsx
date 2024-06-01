import AddFactory from '@/components/add/AddFactory';
import Tabs from '@/components/common/Tabs';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from 'expo-router';
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native';

export type SupportedAddItems = 'Expense' | 'Todo' | 'Journal';

export default function AddScreen() {
  const [selectedItem, setSelectedItem] = useState<SupportedAddItems>('Expense');
  const navigation = useNavigation();
  const handleBackPress = () => {
    if (navigation.canGoBack()) {
      return navigation.goBack();
    }
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.main}>
        <ThemedView style={styles.header}>
          <MaterialCommunityIcons name={'chevron-left'} size={32} onPress={handleBackPress} />
          <ThemedText variant="body-lg">Add</ThemedText>
          <MaterialCommunityIcons name={'chevron-left'} size={32} style={{ opacity: 0 }} />
        </ThemedView>
        <Tabs<SupportedAddItems>
          onSelect={setSelectedItem}
          selectedItem={selectedItem}
          items={['Expense', 'Todo', 'Journal']}
        />

        <SafeAreaView style={{ flex: 1 }}>
          <ScrollView>
            <ThemedView style={styles.formContainer}>
              <AddFactory type={selectedItem} />
            </ThemedView>
          </ScrollView>
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
  header: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  main: {
    flex: 1,
    gap: 16,
  },
  formContainer: {
    marginTop: 16,
    gap: 8,
  },
});
