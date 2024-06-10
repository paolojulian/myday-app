import Button from '@/components/common/Button';
import DatePicker from '@/components/common/forms/DatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import ThemedView from '@/components/common/ThemedView';
import { Formik } from 'formik';
import { useRef } from 'react';
import { TextInput } from 'react-native';
import Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().max(40).required('Title is required'),
  description: Yup.string().max(255),
  category: Yup.string(),
  reminderDate: Yup.date().optional(),
  amount: Yup.number(),
});
type FormValues = Yup.InferType<typeof validationSchema>;

export default function AddTodoForm() {
  const noteRef = useRef<TextInput>(null);
  const handleSubmitForm = () => {};

  return (
    <Formik<FormValues>
      onSubmit={handleSubmitForm}
      initialValues={{
        title: '',
        amount: 0,
        category: '',
        description: '',
      }}
      validationSchema={validationSchema}
    >
      {({ handleSubmit, handleChange, handleBlur, values, setFieldValue }) => (
        <>
          <ThemedView style={{ gap: 8, flex: 1 }}>
            <TextField
              onChangeText={handleChange('title')}
              onBlur={handleBlur('title')}
              value={values.title}
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
            <DatePicker
              value={values.reminderDate}
              onSelectDate={date => setFieldValue('reminderDate', date)}
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
