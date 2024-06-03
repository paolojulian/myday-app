import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { selectionAsync } from 'expo-haptics';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

function BudgetCard() {
  const handlePress = () => {
    selectionAsync();
  };

  return (
    <TouchableOpacity delayPressIn={400} onLongPress={handlePress} activeOpacity={0.6}>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.item}>
          <ThemedText variant="body1">Budget</ThemedText>
          <ThemedText variant="body2" style={{ color: colors.green }}>
            PHP 24,000
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.item}>
          <ThemedText variant="body1">Total spending</ThemedText>
          <ThemedText variant="body2" style={{ color: colors.red }}>
            -PHP 20,000
          </ThemedText>
        </ThemedView>
        <ThemedView style={styles.item}>
          <ThemedText variant="body1">Available balance</ThemedText>
          <ThemedText variant="body2">PHP 4,000</ThemedText>
        </ThemedView>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    gap: 4,
    paddingHorizontal: 24,
    backgroundColor: colors.aliceBlue,
    elevation: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.black,
  },
  item: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default BudgetCard;
