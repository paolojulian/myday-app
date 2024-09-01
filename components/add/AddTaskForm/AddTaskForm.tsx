import { TabName } from '@/app/(tabs)/_layout';
import {
  ADD_TASK_VALIDATION_SCHEMA,
  convertTaskFormToTask,
  NOTE_PLACEHOLDER,
  TaskFormValues,
} from '@/components/add/AddTaskForm/AddTaskForm.utils';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import EasyDatePicker from '@/components/common/EasyDatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import Snackbar from '@/components/common/Snackbar';
import ThemedView from '@/components/common/ThemedView';
import { useCreateTask } from '@/hooks/services/task/useCreateTask';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { useNavigation } from 'expo-router';
import { Formik } from 'formik';
import { Fragment, useRef, useState } from 'react';
import { ScrollView, TextInput } from 'react-native';

export const ADD_TASK_FORM_TEST_IDS = {
  title: 'add-task-form-title',
};

export default function AddTaskForm() {
  const noteRef = useRef<TextInput>(null);
  const navigation = useNavigation();
  const [error, setError] = useState<string | null>(null);
  const { mutateAsync: createTaskMutateAsync } = useCreateTask();

  const showSuccessMessage = () => {
    GlobalSnackbar.show({
      message: 'Todo created successfully',
      duration: GlobalSnackbar.LENGTH_LONG,
      type: 'success',
    });
  };

  const handleSubmitForm = async (values: TaskFormValues) => {
    const insertValues = convertTaskFormToTask(values);
    try {
      await createTaskMutateAsync(insertValues);
      showSuccessMessage();
      navigation.navigate(TabName.Todo as never);
    } catch {
      setError('Failed to create expense');
    }
  };

  const handleTitleSubmitEditing = () => {
    noteRef.current?.focus();
  };

  return (
    <Fragment>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" directionalLockEnabled>
        <Container style={{ flex: 1 }}>
          <Formik<TaskFormValues>
            onSubmit={handleSubmitForm}
            initialValues={{
              title: '',
              category: '',
              description: '',
              toBuy: false,
            }}
            validationSchema={ADD_TASK_VALIDATION_SCHEMA}
          >
            {({
              handleSubmit,
              handleChange,
              handleBlur,
              setFieldValue,
              values,
              touched,
              errors,
            }) => (
              <>
                <ThemedView style={{ gap: 8, flex: 1 }}>
                  <TextField
                    onSubmitEditing={handleTitleSubmitEditing}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    testID={ADD_TASK_FORM_TEST_IDS.title}
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
                  <Button text={'Save'} onPress={() => handleSubmit()} variant="yellow" />
                </ThemedView>
              </>
            )}
          </Formik>
        </Container>
      </ScrollView>

      {/* Error snackbar */}
      <Snackbar onDismiss={() => setError('')} message={error} type="error" />
    </Fragment>
  );
}
