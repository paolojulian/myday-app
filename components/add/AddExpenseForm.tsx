import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import DatePicker from '@/components/common/forms/DatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import ThemedView from '@/components/common/ThemedView';
import React, { useRef, useState } from 'react';
import { TextInput } from 'react-native';

function AddExpenseForm() {
  const amountRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  const handleCategorySubmit = () => {
    amountRef.current?.focus();
  };

  const handleAmountSubmit = () => {
    noteRef.current?.focus();
  };

  return (
    <>
      <Container>
        <ThemedView style={{ gap: 8, flex: 1 }}>
          <TextField
            onSubmitEditing={handleCategorySubmit}
            autoFocus
            label="Category"
            placeholder="Grocery"
            keyboardType="default"
            returnKeyLabel="Next"
            returnKeyType="next"
          />
          <TextField
            ref={amountRef}
            onSubmitEditing={handleAmountSubmit}
            label="Amount"
            placeholder="00.00"
            keyboardType="numeric"
            returnKeyLabel="Done"
            returnKeyType="done"
          />
          <TextArea
            ref={noteRef}
            label="Note"
            placeholder="Grocery items..."
            returnKeyType="next"
          />
          <DatePicker value={selectedDate} onSelectDate={setSelectedDate} variant="border" />
        </ThemedView>
        <ThemedView style={{ marginTop: 8 }}>
          <Button text={'Save'} />
        </ThemedView>
      </Container>
    </>
  );
}

export default AddExpenseForm;
