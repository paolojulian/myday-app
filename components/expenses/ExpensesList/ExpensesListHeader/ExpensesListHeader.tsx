import Container from '@/components/common/Container';
import ThemedView from '@/components/common/ThemedView';
import React from 'react';
import { StyleSheet } from 'react-native';

function ExpensesListHeader() {
  return (
    <Container style={styles.container}>
      <ThemedView style={{}}></ThemedView>
    </Container>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 32,
    gap: 16,
  },
});

export default ExpensesListHeader;
