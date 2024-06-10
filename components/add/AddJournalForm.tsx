import Button from '@/components/common/Button';
import DatePicker from '@/components/common/forms/DatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import ThemedView from '@/components/common/ThemedView';
import { Formik } from 'formik';
import React, { useRef } from 'react';
import { TextInput } from 'react-native';
import * as Yup from 'yup';

const validationSchema = Yup.object().shape({
  title: Yup.string().max(40).required('Title is required'),
  content: Yup.string().max(255),
  date: Yup.date(),
});
export type TodoFormValues = Yup.InferType<typeof validationSchema>;

function AddJournalForm() {
  const contentRef = useRef<TextInput>(null);
  const handleSubmitForm = () => {};
  const handleTitleSubmitEditing = () => {
    contentRef.current?.focus();
  };

  return (
    <Formik<TodoFormValues>
      onSubmit={handleSubmitForm}
      initialValues={{
        title: '',
        content: '',
        date: new Date(),
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
              placeholder="Enter your title"
              returnKeyLabel="Next"
              returnKeyType="next"
            />
            <TextArea
              onChangeText={handleChange('content')}
              onBlur={handleBlur('content')}
              ref={contentRef}
              label="Content"
              placeholder="Write the contents..."
              minHeight={250}
            />
            <DatePicker
              label="Date"
              value={values.date}
              onSelectDate={date => setFieldValue('date', date)}
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

export default AddJournalForm;
