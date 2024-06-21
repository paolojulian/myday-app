import {
  DAY_OF_WEEK,
  DATE_PICKER_TEST_IDS,
} from '@/components/common/forms/DatePicker/DatePicker.constants';
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
import { Image, StyleSheet, TouchableWithoutFeedback } from 'react-native';

type DatePickerVariants = 'shadow' | 'border';

type DatePickerProps = {
  onSelectDate?: (date: Date) => void;
  canShrink?: boolean;
  initialIsExpanded?: boolean;
  initialMonth?: number;
  initialYear?: number;
  label?: string;
  value?: Date;
  variant?: DatePickerVariants;
};

function DatePicker({
  onSelectDate,
  canShrink = true,
  initialIsExpanded = false,
  initialMonth,
  initialYear,
  label = 'Date',
  value,
  variant = 'border',
}: DatePickerProps) {
  const [year, setYear] = useState<number>(initialYear ?? new Date().getFullYear());
  const [month, setMonth] = useState<number>(initialMonth ?? new Date().getMonth() + 1);
  const [isExpanded, setIsExpanded] = useState<boolean>(initialIsExpanded);

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
    const monthTitle = dayjs(new Date(year, month - 1)).format('MMM');

    const currentYear = new Date().getFullYear();
    if (year !== currentYear) {
      return `${monthTitle} ${year}`;
    } else {
      return monthTitle;
    }
  }, [month, year]);

  const handleHeaderClick = () => {
    if (canShrink) {
      setIsExpanded(prev => !prev);
    } else {
      setIsExpanded(true);
    }
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
      testID={DATE_PICKER_TEST_IDS.container}
      style={[
        styles.container,
        {
          ...(variant === 'shadow' && styles.containerShadow),
          ...(variant === 'border' && styles.containerBorder),
        },
      ]}
    >
      <ThemedView style={styles.header}>
        <TouchableWithoutFeedback
          testID={DATE_PICKER_TEST_IDS.headerBtn}
          onPress={handleHeaderClick}
        >
          <ThemedView style={{ flex: 1, flexDirection: 'row', gap: 16, alignItems: 'center' }}>
            <Image
              source={require('@/assets/icons/calendar-lines.png')}
              style={{ width: 24, height: 24 }}
            />
            <ThemedView style={{ gap: 4, flex: 1 }}>
              <Label text={label} />
              <ThemedText
                testID={DATE_PICKER_TEST_IDS.value}
                variant="body1"
                style={{ color: !!value ? colors.black : colors.grey }}
              >
                {titleText}
              </ThemedText>
            </ThemedView>
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
            <ThemedText style={{ width: 40, textAlign: 'center' }} variant="body1">
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
        <ThemedView style={styles.body} testID={DATE_PICKER_TEST_IDS.calendar}>
          <ThemedView style={styles.weekContainer}>
            {DAY_OF_WEEK.map(day => (
              <DatePickerItem
                key={day}
                value={day}
                textStyle={{ color: colors.grey, fontSize: 12 }}
              />
            ))}
          </ThemedView>
          {calendarDays.map((week, index) => (
            <ThemedView key={index} style={styles.weekContainer}>
              {week.map(({ date, isCurrentMonth }) => {
                return (
                  <DatePickerItem
                    onPress={onSelectDate}
                    key={date.toString()}
                    value={date}
                    isActive={value ? isDayActive(date) : false}
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
    paddingHorizontal: 16,

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
