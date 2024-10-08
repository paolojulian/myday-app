import {
  ADD_EXPENSE_FORM_TEST_IDS,
  ADD_EXPENSE_VALIDATION_SCHEMA,
  ExpenseFormValues,
} from '@/components/add/AddExpenseForm/AddExpenseForm.utils';
import Button from '@/components/common/Button';
import CategorySelect from '@/components/common/CategorySelect';
import Container from '@/components/common/Container';
import EasyDatePicker from '@/components/common/EasyDatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import RecurringExpenseField from '@/components/common/RecurringExpenseBottomSheet/RecurringExpenseField';
import Snackbar from '@/components/common/Snackbar';
import ThemedView from '@/components/common/ThemedView';
import { useGetOrCreateCategory } from '@/hooks/services/category/useGetOrCreateCategory';
import { useCreateExpense } from '@/hooks/services/expense/useCreateExpenses';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { TabName } from '@/utils/constants';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { selectionAsync } from 'expo-haptics';
import { useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React, { Fragment, useEffect, useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';

type AddExpenseFormProps = {
  shouldAutoFocus?: boolean;
};

function AddExpenseForm({}: AddExpenseFormProps) {
  const navigation = useNavigation();
  const titleRef = useRef<TextInput>(null);
  const amountRef = useRef<TextInput>(null);
  const categoryRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { mutateAsync: createExpenseMutateAsync } = useCreateExpense();
  const getOrCreateCategory = useGetOrCreateCategory();

  const focusTitle = () => {
    titleRef.current?.focus();
  };
  const focusAmount = () => {
    amountRef.current?.focus();
  };
  const focusCategory = () => {
    categoryRef.current?.focus();
  };
  const handleTitleSubmitEditing = () => {
    focusCategory();
  };

  useEffect(() => {
    focusTitle();
  }, []);

  const showSuccessMessage = () => {
    GlobalSnackbar.show({
      message: 'Expense created successfully',
      duration: GlobalSnackbar.LENGTH_LONG,
      type: 'success',
    });
  };

  const handleFormSubmit = async (values: ExpenseFormValues) => {
    setError(null);
    let categoryId: number | null = null;
    try {
      categoryId = values.category ? await getOrCreateCategory(values.category) : null;
    } catch {
      setError('Failed to get or create category');
      return;
    }

    try {
      await createExpenseMutateAsync({
        category_id: categoryId,
        amount: parseFloat(values.amount),
        description: values.description ?? '',
        title: values.title,
        transaction_date: convertDateToEpoch(values.transactionDate),
        recurrence: values.recurrence,
      });

      showSuccessMessage();
      navigation.navigate(TabName.Expense as never);
    } catch {
      console.error(error);
      setError('Failed to create expense');
      return;
    }
  };

  return (
    <Fragment>
      <ScrollView style={{ flex: 1 }} keyboardShouldPersistTaps="handled" directionalLockEnabled>
        <Container style={{ flex: 1 }}>
          <Formik<ExpenseFormValues>
            initialValues={{
              amount: '',
              title: '',
              category: '',
              description: '',
              transactionDate: new Date(),
              recurrence: null,
            }}
            validationSchema={ADD_EXPENSE_VALIDATION_SCHEMA}
            onSubmit={handleFormSubmit}
          >
            {({
              handleBlur,
              handleChange,
              handleSubmit,
              setFieldValue,
              errors,
              touched,
              values,
            }) => (
              <ThemedView style={{ flex: 1, paddingBottom: 16 }}>
                <ThemedView style={{ gap: 8, flex: 1 }}>
                  <TextField
                    ref={titleRef}
                    testID={ADD_EXPENSE_FORM_TEST_IDS.title}
                    onSubmitEditing={handleTitleSubmitEditing}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    isError={!!errors.title && !!touched.title}
                    errorMessage={errors.title}
                    value={values.title}
                    label="Title"
                    placeholder="e.g. Lunch at Jollibee..."
                    returnKeyLabel="Next"
                    returnKeyType="next"
                  />
                  <CategorySelect
                    onClose={() => {
                      focusAmount();
                    }}
                    onSelect={value => {
                      setFieldValue('category', value);
                      focusAmount();
                    }}
                    value={values.category}
                  />
                  <TextField
                    isError={!!errors.amount && !!touched.amount}
                    errorMessage={errors.amount}
                    testID={ADD_EXPENSE_FORM_TEST_IDS.amount}
                    ref={amountRef}
                    onChangeText={handleChange('amount')}
                    value={values.amount}
                    label="Amount"
                    placeholder="00.00"
                    keyboardType="numeric"
                    returnKeyLabel="Done"
                    returnKeyType="done"
                  />
                  <EasyDatePicker
                    selectedDate={values.transactionDate}
                    onSelectDate={value => {
                      setFieldValue('transactionDate', value);
                    }}
                  />
                  <RecurringExpenseField
                    value={values.recurrence}
                    onSelect={value => {
                      setFieldValue('recurrence', value);
                    }}
                  />
                  <TextArea
                    testID={ADD_EXPENSE_FORM_TEST_IDS.description}
                    ref={noteRef}
                    onChangeText={handleChange('description')}
                    value={values.description}
                    label="Note"
                    placeholder="Additional information about the expense"
                    returnKeyType="next"
                  />
                </ThemedView>
                <ThemedView style={{ marginTop: 24 }}>
                  <Button
                    testID={ADD_EXPENSE_FORM_TEST_IDS.saveButton}
                    text={'Save'}
                    onPress={() => {
                      selectionAsync();
                      handleSubmit();
                    }}
                  />
                </ThemedView>
              </ThemedView>
            )}
          </Formik>
        </Container>
      </ScrollView>

      {/* Error snackbar */}
      <Snackbar onDismiss={() => setError('')} message={error} type="error" />
    </Fragment>
  );
}

export default AddExpenseForm;
