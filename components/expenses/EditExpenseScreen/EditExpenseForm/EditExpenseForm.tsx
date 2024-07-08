import Container from '@/components/common/Container';
import ThemedView from '@/components/common/ThemedView';
import ComboBox from '@/components/common/forms/ComboBox';
import DatePicker from '@/components/common/forms/DatePicker';
import TextArea from '@/components/common/forms/TextArea';
import TextField from '@/components/common/forms/TextField';
import { Formik } from 'formik';
import {
  EDIT_EXPENSE_FORM_TEST_IDS,
  EDIT_EXPENSE_VALIDATION_SCHEMA,
  EditExpenseFormValues,
  resolveFieldName,
} from './EditExpenseForm.utils';
import useCategories from '@/hooks/services/category/useCategories';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useExpense } from '@/hooks/services/expense/useExpense';
import dayjs from 'dayjs';
import { useUpdateExpense } from '@/hooks/services/expense/useUpdateExpense';
import { useDebounceCallback } from 'usehooks-ts';
import { useGetOrCreateCategory } from '@/hooks/services/category/useGetOrCreateCategory';

type EditExpenseFormProps = {
  id: Expense['id'];
};

export default function EditExpenseForm({ id }: EditExpenseFormProps) {
  const { data: categories, isLoading: isLoadingCategories } = useCategories();
  const { data: expense, isLoading: isLoadingExpense } = useExpense(id);
  const { mutateAsync: updateExpenseMutate } = useUpdateExpense(id);
  const getOrCreateCategory = useGetOrCreateCategory();

  const validateAndHandleFieldUpdate = async (
    fieldName: keyof EditExpenseFormValues,
    value: any,
  ) => {
    try {
      await EDIT_EXPENSE_VALIDATION_SCHEMA.validateAt(fieldName, { [fieldName]: value });
      const resolvedFieldName = resolveFieldName(fieldName);
      updateExpenseMutate({ [resolvedFieldName]: value });
      return true;
    } catch (e) {
      console.log(e);
      return false;
    }
  };

  const debouncedHandleChange = useDebounceCallback(validateAndHandleFieldUpdate, 500);

  if (isLoadingCategories || isLoadingExpense) {
    return null;
  }

  const categoryName =
    categories?.find(({ id }) => id === expense?.category_id)?.category_name || '';

  const getCategoryIdByName = async (name: string) => {
    const categoryId = await getOrCreateCategory(name);

    return categoryId ?? null;
  };

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
        }}
        validationSchema={EDIT_EXPENSE_VALIDATION_SCHEMA}
        onSubmit={() => {
          // No form submission needed, everything is inline editing
        }}
      >
        {({ handleChange, handleBlur, setFieldValue, values, errors, touched }) => (
          <ThemedView style={{ flex: 1, paddingBottom: 16 }}>
            <ThemedView style={{ gap: 8, flex: 1 }}>
              <TextField
                testID={EDIT_EXPENSE_FORM_TEST_IDS.title}
                onChangeText={value => {
                  setFieldValue('title', value);
                  debouncedHandleChange('title', value);
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
              <ComboBox
                onSelect={async value => {
                  setFieldValue('category', value);
                  const categoryId = await getCategoryIdByName(value);
                  updateExpenseMutate({ category_id: categoryId });
                }}
                onBlur={async () => {
                  if (!values.category) return;
                  const categoryId = await getCategoryIdByName(values.category);
                  updateExpenseMutate({ category_id: categoryId });
                }}
                onChangeText={handleChange('category')}
                isError={!!errors.category && !!touched.category}
                errorMessage={errors.category}
                options={categories?.map(({ category_name }) => category_name) ?? []}
                value={values.category}
                label="Category"
                placeholder="e.g. Restaurant, Grocery"
                keyboardType="default"
                returnKeyLabel="Done Category"
                returnKeyType="done"
              />
              <TextField
                isError={!!errors.amount && !!touched.amount}
                errorMessage={errors.amount}
                onChangeText={value => {
                  setFieldValue('amount', value);
                  debouncedHandleChange('amount', value);
                }}
                onBlur={handleBlur('amount')}
                value={values.amount}
                label="Amount"
                placeholder="00.00"
                keyboardType="numeric"
                returnKeyLabel="Done"
                returnKeyType="done"
              />
              <DatePicker
                value={values.transactionDate}
                onSelectDate={value => {
                  setFieldValue('transactionDate', value);
                  debouncedHandleChange('transactionDate', dayjs(value).unix());
                }}
                variant="border"
              />
              <TextArea
                onChangeText={value => {
                  setFieldValue('description', value);
                  debouncedHandleChange('description', value);
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
          </ThemedView>
        )}
      </Formik>
    </Container>
  );
}
