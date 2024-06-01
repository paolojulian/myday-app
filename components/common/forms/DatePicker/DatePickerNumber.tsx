import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet } from 'react-native';

type DatePickerNumberProps = {
  value: string | number;
  isActive: boolean;
  isToday: boolean;
  isNotCurrentMonth?: boolean;
};

function DatePickerNumber({
  value,
  isActive,
  isToday,
  isNotCurrentMonth = false,
}: DatePickerNumberProps) {
  return (
    <ThemedView
      style={[styles.container, isActive ? styles.isActive : {}, isToday ? styles.isToday : {}]}
    >
      <ThemedText
        style={{
          ...(isActive && styles.isActiveText),
          ...(isNotCurrentMonth && styles.isNotCurrentMonth),
        }}
      >
        {value}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 9999,
  },
  isActive: {
    backgroundColor: colors.black,
  },
  isToday: {
    backgroundColor: colors.aliceBlue,
  },
  isActiveText: {
    color: colors.white,
  },
  isNotCurrentMonth: {
    color: colors.grey,
  },
});

export default DatePickerNumber;
