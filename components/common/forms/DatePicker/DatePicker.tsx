import DatePickerItem from '@/components/common/forms/DatePicker/DatePickerItem';
import {
  getCalendarDays,
  getCalendarTitle,
  isToday,
} from '@/components/common/forms/DatePicker/utils';
import Label from '@/components/common/forms/Label';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import dayjs from 'dayjs';
import React, { useMemo, useState } from 'react';
import { StyleSheet, TouchableWithoutFeedback } from 'react-native';

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
  const [year, setYear] = useState<number>(initialYear ?? new Date().getFullYear());
  const [month, setMonth] = useState<number>(initialMonth ?? new Date().getMonth() + 1);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);

  const calendarDays = useMemo(() => {
    return getCalendarDays(year, month);
  }, [year, month]);

  const isDayActive = (date: Date) => {
    return dayjs(value).isSame(date, 'day');
  };

  const titleText = useMemo(() => {
    return getCalendarTitle(value);
  }, [value]);
  const currentMonthTitle = useMemo(() => {
    const monthTitle = dayjs(new Date(year, month - 1))
      .format('MMM')
      .toUpperCase();

    const currentYear = new Date().getFullYear();
    if (year !== currentYear) {
      return `${monthTitle} ${year}`;
    } else {
      return monthTitle;
    }
  }, [month, year]);

  const handleHeaderClick = () => {
    setIsExpanded(prev => !prev);
  };

  const handlePrevMonth = () => {
    if (month === 1) {
      setMonth(12);
      setYear(year - 1);
    } else {
      setMonth(month - 1);
    }
  };

  const handleNextMonth = () => {
    if (month === 12) {
      setMonth(1);
      setYear(year + 1);
    } else {
      setMonth(month + 1);
    }
  };

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
        <TouchableWithoutFeedback onPress={handleHeaderClick}>
          <ThemedView style={{ gap: 4, flex: 1 }}>
            <Label text={'Date'} />
            <ThemedText variant="body2" style={{ color: colors.black }}>
              {titleText}
            </ThemedText>
          </ThemedView>
        </TouchableWithoutFeedback>
        {isExpanded && (
          <ThemedView style={styles.monthNavigation}>
            <MaterialCommunityIcons
              size={40}
              name="chevron-left"
              color={colors.black}
              onPress={handlePrevMonth}
            />
            <ThemedText style={{ width: 40, textAlign: 'center' }} variant="body2">
              {currentMonthTitle}
            </ThemedText>
            <MaterialCommunityIcons
              size={40}
              name="chevron-right"
              color={colors.black}
              onPress={handleNextMonth}
            />
          </ThemedView>
        )}
      </ThemedView>
      {isExpanded && (
        <ThemedView style={styles.body}>
          <ThemedView style={styles.weekContainer}>
            <DatePickerItem value="SUN" />
            <DatePickerItem value="MON" />
            <DatePickerItem value="TUE" />
            <DatePickerItem value="WED" />
            <DatePickerItem value="THU" />
            <DatePickerItem value="FRI" />
            <DatePickerItem value="SAT" />
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
      )}
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
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  monthNavigation: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  body: {
    borderBottomStartRadius: 12,
    borderBottomEndRadius: 12,
    backgroundColor: colors.white,
    padding: 16,
  },
  weekContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default DatePicker;
