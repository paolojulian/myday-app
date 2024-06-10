import Button from '@/components/common/Button';
import CheckboxField from '@/components/common/forms/CheckboxField';
import DatePicker from '@/components/common/forms/DatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import ThemedView from '@/components/common/ThemedView';
import { Formik } from 'formik';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().max(40).required('Title is required'),
  description: Yup.string().max(255),
  category: Yup.string(),
  reminderDate: Yup.date().optional(),
  toBuy: Yup.boolean().optional(),
  amount: Yup.string().optional(),
});
export type TodoFormValues = Yup.InferType<typeof validationSchema>;

export default function AddTodoForm() {
  const noteRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const handleSubmitForm = () => {};

  const handleTitleSubmitEditing = () => {
    noteRef.current?.focus();
  };
  const handleToBuyChecked = (value: boolean) => {
    if (value) {
      setTimeout(() => {
        amountRef.current?.focus();
      }, 0);
    }
  };

  return (
    <Formik<TodoFormValues>
      onSubmit={handleSubmitForm}
      initialValues={{
        title: '',
        category: '',
        description: '',
        toBuy: false,
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, handleBlur, values, setFieldValue }) => (
        <>
          <ThemedView style={{ gap: 8, flex: 1 }}>
            <TextField
              onSubmitEditing={handleTitleSubmitEditing}
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              autoFocus
              value={values.title}
              label="Title"
              placeholder="Enter the name of your todo"
              returnKeyLabel="Next"
              returnKeyType="next"
            />
            <TextArea
              ref={noteRef}
              label="Note (Optional)"
              placeholder="Additional information about the todo"
            />
            <DatePicker
              label="Reminder Date (Optional)"
              value={values.reminderDate}
              onSelectDate={date => setFieldValue('reminderDate', date)}
              variant="border"
            />
            <CheckboxField
              onValueChange={value => {
                setFieldValue('toBuy', value);
                handleToBuyChecked(value);
              }}
              label={'To Buy'}
              value={!!values.toBuy}
            />
            {values.toBuy && (
              <TextField
                ref={amountRef}
                label="Expected amount (Optional)"
                placeholder="00.00"
                keyboardType="numeric"
                value={values.amount}
                onChangeText={handleChange('amount')}
                returnKeyType="done"
              />
            )}
          </ThemedView>
          <ThemedView style={{ marginTop: 8 }}>
            <Button text={'Save'} onPress={() => handleSubmit()} />
          </ThemedView>
        </>
      )}
    </Formik>
  );
}