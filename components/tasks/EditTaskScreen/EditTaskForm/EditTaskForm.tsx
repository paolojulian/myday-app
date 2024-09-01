import Container from '@/components/common/Container';
import { Task } from '@/hooks/services/task/task.types';
import { useTask } from '@/hooks/services/task/useTask';
import { Formik } from 'formik';
import { ReactElement, useRef } from 'react';
import { EditTaskFormValues } from './EditTaskForm.utils';
import dayjs from 'dayjs';
import ThemedView from '@/components/common/ThemedView';
import TextField from '@/components/common/forms/TextField';
import TextArea from '@/components/common/forms/TextArea';
import EasyDatePicker from '@/components/common/EasyDatePicker';
import Button from '@/components/common/Button';
import { TextInput } from 'react-native';
import { NOTE_PLACEHOLDER } from '@/components/add/AddTaskForm/AddTaskForm.utils';

type EditTaskFormProps = {
  id: Task['id'];
};

const EditTaskForm = ({ id }: EditTaskFormProps): ReactElement => {
  const { isLoading, data } = useTask(id);

  const noteRef = useRef<TextInput>(null);

  const handleSubmit = (): void => {};
  const handleTitleSubmitEditing = (): void => {
    noteRef.current?.focus();
  };

  if (isLoading) {
    return <></>;
  }

  return (
    <Container style={{ flex: 1 }}>
      <Formik<EditTaskFormValues>
        onSubmit={handleSubmit}
        initialValues={{
          title: data?.title || '',
          description: data?.description || '',
          reminderDate: data?.reminder_date ? dayjs.unix(data.reminder_date).toDate() : undefined,
        }}
      >
        {({ handleSubmit, handleChange, handleBlur, setFieldValue, values, touched, errors }) => (
          <>
            <ThemedView style={{ gap: 8, flex: 1 }}>
              <TextField
                onSubmitEditing={handleTitleSubmitEditing}
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                isError={touched.title && !!errors.title}
                errorMessage={errors.title}
                autoFocus
                value={values.title}
                label="Title"
                placeholder="Buy groceries..."
                returnKeyLabel="Next"
                returnKeyType="next"
              />
              <TextArea
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                ref={noteRef}
                label="Note (Optional)"
                placeholder={NOTE_PLACEHOLDER}
                isError={touched.description && !!errors.description}
                errorMessage={errors.description}
                value={values.description}
              />
              <EasyDatePicker
                onSelectDate={date => setFieldValue('reminderDate', date)}
                selectedDate={values.reminderDate}
                label="Reminder Date"
              />
            </ThemedView>
            <ThemedView style={{ marginTop: 24, paddingBottom: 16 }}>
              <Button text={'Update'} onPress={() => handleSubmit()} variant="yellow" />
            </ThemedView>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default EditTaskForm;
