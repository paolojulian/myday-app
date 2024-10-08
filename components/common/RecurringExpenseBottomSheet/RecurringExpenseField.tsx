import { colors } from '@/constants/Colors';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useState } from 'react';
import { SafeAreaView, TouchableOpacity } from 'react-native';
import BottomSheetModal from '../BottomSheetModal';
import Row from '../Row';
import Stack from '../Stack';
import ThemedText from '../ThemedText';
import ThemedView from '../ThemedView';
import Label from '../forms/Label';
import RecurrenceOption from './RecurrenceOption';

type RecurringExpenseFieldProps = {
  value: Expense['recurrence'];
  onSelect: (value: Expense['recurrence']) => void;
};

export default function RecurringExpenseField({ onSelect, value }: RecurringExpenseFieldProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleShow = () => {
    setIsOpen(true);
  };
  const handleHide = () => {
    setIsOpen(false);
  };

  const handleSelect = (value: Expense['recurrence']) => {
    handleHide();
    onSelect(value);
  };

  const formattedValue = value === null ? 'None' : value;

  return (
    <>
      <TouchableOpacity onPress={handleShow}>
        <ThemedView
          style={{
            backgroundColor: colors.v2.grayDark,
            borderRadius: 8,
            paddingVertical: 12,
            paddingHorizontal: 16,
            gap: 4,
          }}
        >
          <Label text="Recurring Expense" />
          <ThemedText variant="body-md" style={{ textTransform: 'capitalize' }}>
            {formattedValue}
          </ThemedText>
        </ThemedView>
      </TouchableOpacity>
      <BottomSheetModal variant="slide" isOpen={isOpen} onClose={handleHide}>
        <SafeAreaView style={{ marginBottom: 40 }}>
          <Row style={{ paddingBottom: 24 }}>
            <ThemedText variant="header-sm">Recurring Expense</ThemedText>
          </Row>
          <Stack style={{ gap: 8 }}>
            <RecurrenceOption isSelected={!value} title="None" onPress={() => handleSelect(null)} />
            <RecurrenceOption
              isSelected={value === 'weekly'}
              title="Weekly"
              onPress={() => handleSelect('weekly')}
            />
            <RecurrenceOption
              isSelected={value === 'monthly'}
              title="Monthly"
              onPress={() => handleSelect('monthly')}
            />
          </Stack>
        </SafeAreaView>
      </BottomSheetModal>
    </>
  );
}
