import DatePicker from '@/components/common/forms/DatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
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
      <TextArea ref={noteRef} label="Note" placeholder="Grocery items..." returnKeyType="next" />
      <DatePicker value={selectedDate} onSelectDate={setSelectedDate} variant="border" />
    </>
  );
}

export default AddExpenseForm;
