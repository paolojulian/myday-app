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
import DatePicker from '../forms/DatePicker';

type EasyDatePickerTypes = 'today' | 'tomorrow' | 'custom';

type EasyDatePickerProps = {
  onSelectDate: (date: Date) => void;
  selectedDate?: Date;
  label: string;
};

export default function EasyDatePicker({ onSelectDate, selectedDate, label }: EasyDatePickerProps) {
  const [selectedType, setSelectedType] = useState<EasyDatePickerTypes | null>(null);

  const handlePressToday = () => {
    setSelectedType('today');
    onSelectDate(new Date());
  };

  const handlePressTomorrow = () => {
    setSelectedType('tomorrow');
    onSelectDate(dayjs().add(1, 'day').toDate());
  };

  const handlePressCustom = () => {
    setSelectedType('custom');
  };

  const isToday = useMemo<boolean>(() => {
    if (!selectedDate) {
      return false;
    }
    return dayjs(selectedDate).isSame(dayjs(), 'day');
  }, [selectedDate]);
  const isTomorrow = useMemo<boolean>(() => {
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
    >
      {selectedType === 'custom' ? (
        <DatePicker
          value={selectedDate}
          onSelectDate={onSelectDate}
          variant="border"
          initialIsExpanded={true}
          label={label}
        />
      ) : (
        <>
          <Item
            onPress={handlePressToday}
            IconComponent={<CalendarTodayIcon />}
            isActive={!!isToday}
            title="Today"
          ></Item>
          <Item
            onPress={handlePressTomorrow}
            IconComponent={<CalendarTomorrowIcon />}
            title="Tomorrow"
            isActive={!!isTomorrow}
          ></Item>
          <Item
            onPress={handlePressCustom}
            IconComponent={<CalendarCustomIcon />}
            title="Custom"
            isActive={false}
          ></Item>
        </>
      )}
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
            backgroundColor: colors.whiteSmoke,
            borderWidth: 1,
            borderColor: isActive ? colors.black : colors.whiteSmoke,
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
