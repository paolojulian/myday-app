import DatePickerNumber from '@/components/common/forms/DatePicker/DatePickerNumber';
import { getCalendarDays } from '@/components/common/forms/DatePicker/utils';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useMemo } from 'react';
import { StyleSheet } from 'react-native';

type DatePickerVariants = 'shadow' | 'border';

type DatePickerProps = {
  variant?: DatePickerVariants;
  year?: number;
  month?: number;
};

function DatePicker({ variant = 'border', year, month }: DatePickerProps) {
  const resolvedYear = year || new Date().getFullYear();
  const resolvedMonth = month || new Date().getMonth() + 1;

  const splitCalendarDays = useMemo(() => {
    const calendarDays = getCalendarDays(resolvedYear, resolvedMonth);
    const splitCalendarDays = [];
    while (calendarDays.length > 0) {
      splitCalendarDays.push(calendarDays.splice(0, 7));
    }
    return splitCalendarDays;
  }, [resolvedYear, resolvedMonth]);

  return (
    <ThemedView
      style={[
        styles.container,
        {
          ...(variant === 'shadow' && styles.containerShadow),
          ...(variant === 'border' && styles.containerBorder),
        },
      ]}
    >
      <ThemedView style={styles.header}>
        <ThemedText style={{ color: colors.black }}>March 2024</ThemedText>
        <ThemedView style={styles.monthNavigation}>
          <MaterialCommunityIcons size={24} name="chevron-left" color={colors.black} />
          <MaterialCommunityIcons size={24} name="chevron-right" color={colors.black} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.body}>
        <ThemedView style={styles.weekContainer}>
          <DatePickerNumber value="Sun" isActive={false} isToday={false} />
          <DatePickerNumber value="Mon" isActive={false} isToday={false} />
          <DatePickerNumber value="Tue" isActive={false} isToday={false} />
          <DatePickerNumber value="Wed" isActive={false} isToday={false} />
          <DatePickerNumber value="Thu" isActive={false} isToday={false} />
          <DatePickerNumber value="Fri" isActive={false} isToday={false} />
          <DatePickerNumber value="Sat" isActive={false} isToday={false} />
        </ThemedView>
        {splitCalendarDays.map((week, index) => (
          <ThemedView key={index} style={styles.weekContainer}>
            {week.map(({ day, isCurrentMonth }) => (
              <DatePickerNumber
                key={day}
                value={day}
                isActive={false}
                isToday={false}
                isCurrentMonth={isCurrentMonth}
              />
            ))}
          </ThemedView>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {},
  containerShadow: {
    shadowColor: colors.black,
    shadowOpacity: 0.24,
    shadowRadius: 12,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    elevation: 5,
  },
  containerBorder: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.whiteSmoke,
  },
  header: {
    borderTopStartRadius: 12,
    borderTopEndRadius: 12,
    backgroundColor: colors.whiteSmoke,
    paddingVertical: 16,
    paddingHorizontal: 24,

    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  monthNavigation: {
    display: 'flex',
    flexDirection: 'row',
  },
  body: {
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    backgroundColor: colors.white,
    padding: 16,
    gap: 8,
  },
  weekContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DatePicker;
