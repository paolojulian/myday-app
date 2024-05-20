import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Page() {
  return (
    <ThemedView style={styles.container}>
      <ThemedView style={styles.main}>
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
