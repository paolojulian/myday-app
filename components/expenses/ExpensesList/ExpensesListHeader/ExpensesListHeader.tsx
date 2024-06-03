import Container from '@/components/common/Container';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';

function ExpensesListHeader() {
  return (
    <Container style={styles.container}>
      <ThemedView style={{}}>
        <ThemedText variant="heading" style={{ color: colors.white }}>
          Expenses
        </ThemedText>
      </ThemedView>
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
