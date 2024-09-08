import { ComponentProps, FC, useState } from 'react';
import { DatePickerSheetContainer, DatePickerSheetValue } from './DatePickerSheet.style';
import { View } from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import CalendarCustomIcon from '../icons/CalendarCustomIcon';
import BottomSheetModal from '../BottomSheetModal';
import Stack from '../Stack';
import ThemedText from '../ThemedText';
import { colors } from '@/constants/Colors';
import Button from '../Button';

type DatePickerSheetProps = {
  onChange: (date: Date | null) => void;
  maximumDate?: Date;
  placeholder?: string;
  value: Date | null;
};

const DatePickerSheet: FC<DatePickerSheetProps> = ({
  onChange,
  maximumDate,
  placeholder = 'Select Date',
  value,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [date, setDate] = useState<Date>(value ?? maximumDate ?? new Date());

  const handlePress = () => {
    setIsOpen(true);
  };

  const handleCloseSheet = () => {
    setIsOpen(false);
  };

  const handleDateChange: ComponentProps<typeof RNDateTimePicker>['onChange'] = (_, value) => {
    if (value) {
      setDate(value);
    }
  };

  const handleDone = () => {
    onChange(date);
    setIsOpen(false);
  };

  return (
    <>
      <BottomSheetModal onClose={handleCloseSheet} isOpen={isOpen}>
        <Stack style={{ gap: 16, paddingBottom: 48, alignItems: 'center' }}>
          <ThemedText style={{ textAlign: 'center' }} variant="body-md">
            {placeholder}
          </ThemedText>
          <View style={{ alignSelf: 'stretch' }}>
            <RNDateTimePicker
              onChange={handleDateChange}
              maximumDate={maximumDate}
              textColor={colors.v2.white}
              value={date}
              mode="date"
              display="spinner"
            />
          </View>
          <Button
            onPress={handleDone}
            style={{ alignSelf: 'center', width: 195 }}
            text="Done"
          ></Button>
        </Stack>
      </BottomSheetModal>

      <DatePickerSheetContainer onPress={handlePress}>
        <CalendarCustomIcon />
        <DatePickerSheetValue value={value} placeholder={placeholder} />
      </DatePickerSheetContainer>
    </>
  );
};

export default DatePickerSheet;
