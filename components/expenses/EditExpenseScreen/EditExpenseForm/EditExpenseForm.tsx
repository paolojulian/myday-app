import CategorySelect from '@/components/common/CategorySelect';
import Container from '@/components/common/Container';
import EasyDatePicker from '@/components/common/EasyDatePicker';
import RecurringExpenseField from '@/components/common/RecurringExpenseBottomSheet';
import ThemedView from '@/components/common/ThemedView';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import useCategories from '@/hooks/services/category/useCategories';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useExpense } from '@/hooks/services/expense/useExpense';
import { useUpdateExpense } from '@/hooks/services/expense/useUpdateExpense';
import dayjs from 'dayjs';
import { Formik } from 'formik';
import {
  EDIT_EXPENSE_FORM_TEST_IDS,
  EDIT_EXPENSE_VALIDATION_SCHEMA,
  EditExpenseFormValues,
} from './EditExpenseForm.utils';
import Button from '@/components/common/Button';
import { useGetOrCreateCategory } from '@/hooks/services/category/useGetOrCreateCategory';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { useNavigation } from 'expo-router';
import { TabName } from '@/app/(tabs)/_layout';

type EditExpenseFormProps = {
  id: Expense['id'];
};

export default function EditExpenseForm({ id }: EditExpenseFormProps) {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: expense, isLoading: isLoadingExpense } = useExpense(id);
  const getOrCreateCategory = useGetOrCreateCategory();
  const { isPending: isUpdating, mutateAsync: updateExpenseMutateAsync } = useUpdateExpense(id);
  const navigation = useNavigation();

  const handleSuccess = (): void => {
    GlobalSnackbar.show({
      message: 'Expense updated successfully',
      type: 'success',
    });
    navigation.navigate(TabName.Expense as never);
  };
  const handleError = (error: unknown): void => {
    let message = 'An error occurred while updating the expense. Please try again later';
    if (error instanceof Error) {
      message = error.message;
    }
    GlobalSnackbar.show({ message, type: 'error' });
  };

  const handleSubmitForm = async (values: EditExpenseFormValues): Promise<void> => {
    let categoryId: number | null = null;
    try {
      categoryId = values.category ? await getOrCreateCategory(values.category) : null;
    } catch (error) {
      handleError(error);
      return;
    }

    try {
      await updateExpenseMutateAsync({
        ...values,
        categoryId,
      });
      handleSuccess();
    } catch (error) {
      handleError(error);
    }
  };

  if (isLoadingCategories || isLoadingExpense) {
    return null;
  }

  const categoryName =
    categories?.find(({ id }) => id === expense?.category_id)?.category_name || '';

  return (
    <Container style={{ flex: 1 }}>
      <Formik<EditExpenseFormValues>
        initialValues={{
          amount: expense?.amount.toString() || '',
          title: expense?.title || '',
          category: categoryName,
          description: expense?.description || '',
          transactionDate: expense?.transaction_date
            ? dayjs.unix(expense.transaction_date).toDate()
            : new Date(),
          recurrence: expense?.recurrence || null,
        }}
        validationSchema={EDIT_EXPENSE_VALIDATION_SCHEMA}
        onSubmit={handleSubmitForm}
      >
        {({ handleBlur, handleSubmit, setFieldValue, values, errors, touched }) => (
          <ThemedView style={{ flex: 1, paddingBottom: 16 }}>
            <ThemedView style={{ gap: 8, flex: 1 }}>
              <TextField
                testID={EDIT_EXPENSE_FORM_TEST_IDS.title}
                onChangeText={value => {
                  setFieldValue('title', value);
                }}
                onBlur={handleBlur('title')}
                isError={!!errors.title && !!touched.title}
                errorMessage={errors.title}
                value={values.title}
                label="Title"
                placeholder="e.g. Lunch at Jollibee..."
                returnKeyLabel="Done Title"
                returnKeyType="done"
              />

              <CategorySelect
                onSelect={value => {
                  setFieldValue('category', value);
                }}
                value={values.category}
              />
              <TextField
                isError={!!errors.amount && !!touched.amount}
                errorMessage={errors.amount}
                onChangeText={value => {
                  setFieldValue('amount', value);
                }}
                onBlur={handleBlur('amount')}
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
                onChangeText={value => {
                  setFieldValue('description', value);
                }}
                onBlur={handleBlur('description')}
                value={values.description}
                label="Note"
                placeholder="Additional information about the expense"
                numberOfLines={0}
                returnKeyLabel="Next"
                returnKeyType="done"
              />
            </ThemedView>
            <ThemedView style={{ marginTop: 24, paddingBottom: 16 }}>
              <Button
                text={'Update'}
                onPress={() => handleSubmit()}
                variant="yellow"
                isLoading={isUpdating}
              />
            </ThemedView>
          </ThemedView>
        )}
      </Formik>
    </Container>
  );
}
