import DatePickerItem from '@/components/common/forms/DatePicker/DatePickerItem';
import { getCalendarDays, isToday } from '@/components/common/forms/DatePicker/utils';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';

type DatePickerVariants = 'shadow' | 'border';

type DatePickerProps = {
  onSelectDate?: (date: Date) => void;
  initialMonth?: number;
  initialYear?: number;
  value?: Date;
  variant?: DatePickerVariants;
};

function DatePicker({
  onSelectDate,
  value,
  variant = 'border',
  initialYear,
  initialMonth,
}: DatePickerProps) {
  const [year] = useState<number>(initialYear ?? new Date().getFullYear());
  const [month] = useState<number>(initialMonth ?? new Date().getMonth() + 1);

  const calendarDays = useMemo(() => {
    return getCalendarDays(year, month);
  }, [year, month]);

  const isDayActive = (date: Date) => {
    return dayjs(value).isSame(date, 'day');
  };

  const titleText = useMemo(() => {
    if (!value) {
      return 'Select a date';
    }

    if (value && isToday(value)) {
      return 'Today';
    }

    const valueDayJS = dayjs(value);
    if (value && valueDayJS.isSame(dayjs(), 'year')) {
      return valueDayJS.format('MMM D');
    }

    return valueDayJS.format('MMM D YYYY');
  }, [value]);

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
        <ThemedText style={{ color: colors.black }}>{titleText}</ThemedText>
        <ThemedView style={styles.monthNavigation}>
          <MaterialCommunityIcons size={24} name="chevron-left" color={colors.black} />
          <MaterialCommunityIcons size={24} name="chevron-right" color={colors.black} />
        </ThemedView>
      </ThemedView>
      <ThemedView style={styles.body}>
        <ThemedView style={styles.weekContainer}>
          <DatePickerItem value="Sun" isActive={false} isToday={false} />
          <DatePickerItem value="Mon" isActive={false} isToday={false} />
          <DatePickerItem value="Tue" isActive={false} isToday={false} />
          <DatePickerItem value="Wed" isActive={false} isToday={false} />
          <DatePickerItem value="Thu" isActive={false} isToday={false} />
          <DatePickerItem value="Fri" isActive={false} isToday={false} />
          <DatePickerItem value="Sat" isActive={false} isToday={false} />
        </ThemedView>
        {calendarDays.map((week, index) => (
          <ThemedView key={index} style={styles.weekContainer}>
            {week.map(({ date, isCurrentMonth }) => {
              return (
                <DatePickerItem
                  onPress={onSelectDate}
                  key={date.getDate().toString()}
                  value={date}
                  isActive={isDayActive(date)}
                  isToday={isToday(date)}
                  isCurrentMonth={isCurrentMonth}
                />
              );
            })}
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
