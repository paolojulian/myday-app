import Button from '@/components/common/Button';
import ComboBox from '@/components/common/forms/ComboBox';
import DatePicker from '@/components/common/forms/DatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import ThemedView from '@/components/common/ThemedView';
import { useGetOrCreateCategory } from '@/hooks/services/category/useGetOrCreateCategory';
import useCreateExpense from '@/hooks/services/expense/useCreateExpenses';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().max(40).required('Title is required'),
  category: Yup.string().max(100),
  amount: Yup.string().required('Amount is required'),
  description: Yup.string().max(255),
  transactionDate: Yup.date().required('Transaction date is required'),
});
export type ExpenseFormValues = Yup.InferType<typeof validationSchema>;

function AddExpenseForm() {
  const amountRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const [, setError] = React.useState<string | null>(null);
  const { mutate: createExpenseMutate } = useCreateExpense();
  const getOrCreateCategory = useGetOrCreateCategory();

  const focusAmount = () => {
    amountRef.current?.focus();
  };

  const handleCategorySubmit = () => {
    focusAmount();
  };

  const handleTitleSubmitEditing = () => {
    // focusCategory();
  };

  const handleFormSubmit = async (values: ExpenseFormValues) => {
    setError(null);
    try {
      const categoryId = values.category ? await getOrCreateCategory(values.category) : null;

      await createExpenseMutate({
        category_id: categoryId,
        amount: parseFloat(values.amount),
        description: values.description ?? '',
        title: values.title,
        transaction_date: convertDateToEpoch(values.transactionDate),
      });
    } catch {
      setError('Failed to create expense');
    }
  };

  return (
    <Formik<ExpenseFormValues>
      initialValues={{
        amount: '',
        title: '',
        category: '',
        description: '',
        transactionDate: new Date(),
      }}
      validationSchema={validationSchema}
      onSubmit={handleFormSubmit}
    >
      {({ handleChange, handleBlur, setFieldValue, values, handleSubmit }) => (
        <>
          <ThemedView style={{ gap: 8, flex: 1 }}>
            <TextField
              autoFocus
              onSubmitEditing={handleTitleSubmitEditing}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
              label="Title"
              placeholder="Dinner at Jollibee..."
              returnKeyLabel="Next"
              returnKeyType="next"
            />
            <ComboBox
              onSubmitEditing={handleCategorySubmit}
              onSelect={value => {
                setFieldValue('category', value);
                focusAmount();
              }}
              onChangeText={handleChange('category')}
              options={['Food', 'Grocery', 'Transport', 'Entertainment', 'Other']}
              value={values.category}
              label="Category"
              placeholder="Restaurant"
              keyboardType="default"
              returnKeyLabel="Next"
              returnKeyType="next"
            />
            <TextField
              ref={amountRef}
              onChangeText={handleChange('amount')}
              value={values.amount}
              label="Amount"
              placeholder="00.00"
              keyboardType="numeric"
              returnKeyLabel="Done"
              returnKeyType="done"
            />
            <TextArea
              ref={noteRef}
              onChangeText={handleChange('description')}
              value={values.description}
              label="Note"
              placeholder="Additional information about the expense"
              returnKeyType="next"
            />
            <DatePicker
              value={values.transactionDate}
              onSelectDate={value => {
                setFieldValue('transactionDate', value);
              }}
              variant="border"
            />
          </ThemedView>
          <ThemedView style={{ marginTop: 8 }}>
            <Button text={'Save'} onPress={() => handleSubmit()} />
          </ThemedView>
        </>
      )}
    </Formik>
  );
}

export default AddExpenseForm;
