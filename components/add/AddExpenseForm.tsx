import Button from '@/components/common/Button';
import ComboBox from '@/components/common/forms/ComboBox';
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
  const [form, setForm] = useState({
    category: '',
  });

  const handleCategorySubmit = () => {
    amountRef.current?.focus();
  };

  const handleChangeCategory = (value: string) => {
    setForm(prev => ({ ...prev, category: value }));
  };

  const handleSelectCategory = (value: string) => {
    handleChangeCategory(value);
    amountRef.current?.focus();
  };

  const handleAmountSubmit = () => {
    noteRef.current?.focus();
  };

  return (
    <>
      <ThemedView style={{ gap: 8, flex: 1 }}>
        <ComboBox
          onSubmitEditing={handleCategorySubmit}
          onSelect={handleSelectCategory}
          onChangeText={handleChangeCategory}
          autoFocus
          options={['Food', 'Grocery', 'Transport', 'Entertainment', 'Other']}
          value={form.category}
          label="Category"
          placeholder="Select or create a new category"
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
          placeholder="Additional information about the expense"
          returnKeyType="next"
        />
        <DatePicker value={selectedDate} onSelectDate={setSelectedDate} variant="border" />
      </ThemedView>
      <ThemedView style={{ marginTop: 8 }}>
        <Button text={'Save'} />
      </ThemedView>
    </>
  );
}

export default AddExpenseForm;
