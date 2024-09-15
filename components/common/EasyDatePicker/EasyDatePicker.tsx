import { ReactNode, useMemo, useState } from 'react';
import Row from '../Row';
import Stack from '../Stack';
import ThemedText from '../ThemedText';
import { TouchableOpacity } from 'react-native';
import dayjs from 'dayjs';
import { colors } from '@/constants/Colors';
import CalendarTodayIcon from '../icons/CalendarTodayIcon';
import CalendarTomorrowIcon from '../icons/CalendarTomorrowIcon';
import CalendarCustomIcon from '../icons/CalendarCustomIcon';
import DatePickerSheet from '../DatePickerSheet';

export const EASY_DATE_PICKER_TEST_IDS = {
  container: 'easy-date-picker__container',
};

type EasyDatePickerTypes = 'today' | 'tomorrow' | 'custom';

type EasyDatePickerProps = {
  onSelectDate: (date: Date) => void;
  selectedDate?: Date;
  label?: string;
};

export default function EasyDatePicker({ onSelectDate, selectedDate }: EasyDatePickerProps) {
  const [selectedType, setSelectedType] = useState<EasyDatePickerTypes | null>(() => {
    if (!selectedDate) {
      return null;
    }
    if (dayjs(selectedDate).isSame(dayjs(), 'day')) {
      return 'today';
    }
    if (dayjs(selectedDate).isSame(dayjs().add(1, 'day'), 'day')) {
      return 'tomorrow';
    }
    return 'custom';
  });

  const handlePressToday = (): void => {
    setSelectedType('today');
    onSelectDate(new Date());
  };

  const handlePressTomorrow = (): void => {
    setSelectedType('tomorrow');
    onSelectDate(dayjs().add(1, 'day').toDate());
  };

  const handleCustomDateChange = (date: Date | null) => {
    if (!date) return;

    setSelectedType('custom');
    onSelectDate(date);
  };

  const isToday: boolean = useMemo<boolean>(() => {
    if (!selectedDate) {
      return false;
    }
    return dayjs(selectedDate).isSame(dayjs(), 'day');
  }, [selectedDate]);

  const customDateTitle =
    selectedType === 'custom' ? dayjs(selectedDate).format('DD MMM YY') : 'Custom';

  const isTomorrow: boolean = useMemo<boolean>(() => {
    if (!selectedDate) {
      return false;
    }
    return dayjs(selectedDate).isSame(dayjs().add(1, 'day'), 'day');
  }, [selectedDate]);

  return (
    <Row
      style={{
        gap: 8,
        flex: 1,
      }}
      testID={EASY_DATE_PICKER_TEST_IDS.container}
    >
      <>
        <Item
          onPress={handlePressToday}
          IconComponent={<CalendarTodayIcon />}
          isActive={!!isToday && selectedType === 'today'}
          title="Today"
        ></Item>
        <Item
          onPress={handlePressTomorrow}
          IconComponent={<CalendarTomorrowIcon />}
          title="Tomorrow"
          isActive={!!isTomorrow && selectedType === 'tomorrow'}
        ></Item>
        <DatePickerSheet
          value={selectedDate ?? null}
          onChange={handleCustomDateChange}
          AnchorComponent={({ onPress }) => (
            <Item
              onPress={onPress}
              IconComponent={<CalendarCustomIcon />}
              title={customDateTitle}
              isActive={selectedType === 'custom'}
            ></Item>
          )}
        ></DatePickerSheet>
      </>
    </Row>
  );
}

type ItemProps = {
  onPress: () => void;
  IconComponent: ReactNode;
  title: string;
  isActive: boolean;
};
function Item({ onPress, IconComponent, title, isActive }: ItemProps) {
  return (
    <TouchableOpacity style={{ flex: 1 }} onPress={onPress}>
      <Stack
        style={[
          {
            backgroundColor: colors.v2.grayDark,
            borderWidth: 1,
            borderColor: isActive ? colors.v2.white : colors.v2.grayDark,
            padding: 16,
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            gap: 8,
            borderRadius: 8,
          },
        ]}
      >
        {IconComponent}
        <ThemedText>{title}</ThemedText>
      </Stack>
    </TouchableOpacity>
  );
}
