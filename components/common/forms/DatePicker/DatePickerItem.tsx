import { DATE_PICKER_ITEM_TEST_IDS } from '@/components/common/forms/DatePicker/DatePickerItem.contants';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import dayjs from 'dayjs';
import React from 'react';
import { StyleProp, StyleSheet, TextStyle, TouchableOpacity, ViewStyle } from 'react-native';

type DatePickerItemProps = {
  onPress?: (date: Date) => void;
  value: Date | string;
  isActive?: boolean;
  isToday?: boolean;
  isCurrentMonth?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
};

function DatePickerItem({
  onPress,
  value,
  isActive = false,
  isToday = false,
  isCurrentMonth = true,
  containerStyle = {},
  textStyle = {},
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
    <TouchableOpacity
      onPress={handlePress}
      testID={DATE_PICKER_ITEM_TEST_IDS.containerBtn(
        typeof value === 'string' ? value : dayjs(value).format('YYYY-MM-DD'),
      )}
    >
      <ThemedView
        style={[
          styles.container,
          {
            ...(isToday && styles.isToday),
            ...(isActive && styles.isActive),
          },
          containerStyle,
        ]}
      >
        <ThemedText
          style={[
            {
              ...(isActive && styles.isActiveText),
              ...(!isCurrentMonth && styles.isNotCurrentMonth),
            },
            textStyle,
          ]}
          variant="body1"
        >
          {typeof value === 'string' ? value : value.getDate()}
        </ThemedText>
      </ThemedView>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
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
