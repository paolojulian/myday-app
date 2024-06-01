import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

type DatePickerItemProps = {
  onPress?: (date: Date) => void;
  value: Date | string;
  isActive: boolean;
  isToday: boolean;
  isCurrentMonth?: boolean;
};

function DatePickerItem({
  onPress,
  value,
  isActive,
  isToday,
  isCurrentMonth = true,
}: DatePickerItemProps) {
  const handlePress = () => {
    if (typeof value === 'string') {
      return;
    }

    if (onPress) {
      onPress(value);
    }
  };
  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedView
        style={[
          styles.container,
          {
            ...(isToday && styles.isToday),
            ...(isActive && styles.isActive),
          },
        ]}
      >
        <ThemedText
          style={{
            ...(isActive && styles.isActiveText),
            ...(!isCurrentMonth && styles.isNotCurrentMonth),
          }}
        >
          {typeof value === 'string' ? value : value.getDate()}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
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

export default DatePickerItem;
