import TextField from '@/components/common/forms/TextField';
import React from 'react';

function AddExpenseForm() {
  return (
    <>
      <TextField
        autoFocus
        label="Category"
        placeholder="Grocery"
        keyboardType="default"
        returnKeyLabel="Next"
        returnKeyType="next"
      />
      <TextField
        label="Amount"
        placeholder="00.00"
        keyboardType="numeric"
        returnKeyLabel="Next"
        returnKeyType="next"
      />
      <TextField label="Note" placeholder="00.00" keyboardType="numeric" />
    </>
  );
}

export default AddExpenseForm;
