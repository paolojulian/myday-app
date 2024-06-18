import { TabName } from '@/app/(tabs)/_layout';
import {
  ADD_EXPENSE_FORM_TEST_IDS,
  addExpenseValidationSchema,
  ExpenseFormValues,
} from '@/components/add/AddExpenseForm/AddExpenseForm.utils';
import Button from '@/components/common/Button';
import Container from '@/components/common/Container';
import ComboBox from '@/components/common/forms/ComboBox';
import DatePicker from '@/components/common/forms/DatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import Snackbar from '@/components/common/Snackbar';
import ThemedView from '@/components/common/ThemedView';
import useCategory from '@/hooks/services/category/useCategory';
import { useGetOrCreateCategory } from '@/hooks/services/category/useGetOrCreateCategory';
import { useCreateExpense } from '@/hooks/services/expense/useCreateExpenses';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import { selectionAsync } from 'expo-haptics';
import { useNavigation } from 'expo-router';
import { Formik } from 'formik';
import React, { Fragment, useRef } from 'react';
import { ScrollView, TextInput } from 'react-native';

function AddExpenseForm() {
  const navigation = useNavigation();
  const amountRef = useRef<TextInput>(null);
  const categoryRef = useRef<TextInput>(null);
  const noteRef = useRef<TextInput>(null);
  const [error, setError] = React.useState<string | null>(null);
  const { mutate: createExpenseMutate } = useCreateExpense();
  const getOrCreateCategory = useGetOrCreateCategory();
  const { data: categories } = useCategory();

  const focusAmount = () => {
    amountRef.current?.focus();
  };
  const focusCategory = () => {
    categoryRef.current?.focus();
  };
  const handleCategorySubmit = () => {
    focusAmount();
  };
  const handleTitleSubmitEditing = () => {
    focusCategory();
  };

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
    }

    try {
      await createExpenseMutate({
        category_id: categoryId,
        amount: parseFloat(values.amount),
        description: values.description ?? '',
        title: values.title,
        transaction_date: convertDateToEpoch(values.transactionDate),
      });

      showSuccessMessage();
      navigation.navigate(TabName.Expense as never);
    } catch {
      console.error(error);
      setError('Failed to create expense');
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
            }}
            validationSchema={addExpenseValidationSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleChange, handleBlur, setFieldValue, values, handleSubmit }) => (
              <ThemedView style={{ flex: 1, paddingBottom: 16 }}>
                <ThemedView style={{ gap: 8, flex: 1 }}>
                  <TextField
                    testID={ADD_EXPENSE_FORM_TEST_IDS.title}
                    autoFocus
                    onSubmitEditing={handleTitleSubmitEditing}
                    onChangeText={handleChange('title')}
                    onBlur={handleBlur('title')}
                    value={values.title}
                    label="Title"
                    placeholder="e.g. Lunch at Jollibee..."
                    returnKeyLabel="Next"
                    returnKeyType="next"
                  />
                  <ComboBox
                    ref={categoryRef}
                    testID={ADD_EXPENSE_FORM_TEST_IDS.category}
                    onSubmitEditing={handleCategorySubmit}
                    onSelect={value => {
                      setFieldValue('category', value);
                      focusAmount();
                    }}
                    onChangeText={handleChange('category')}
                    options={categories?.map(({ category_name }) => category_name) ?? []}
                    value={values.category}
                    label="Category"
                    placeholder="e.g. Restaurant, Grocery"
                    keyboardType="default"
                    returnKeyLabel="Next"
                    returnKeyType="next"
                  />
                  <TextField
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
                  <TextArea
                    testID={ADD_EXPENSE_FORM_TEST_IDS.description}
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
