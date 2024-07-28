import Button from '@/components/common/Button';
import Stack from '@/components/common/Stack';
import { Expense } from '@/hooks/services/expense/expense.types';
import { useUpdateExpense } from '@/hooks/services/expense/useUpdateExpense';
import { Formik } from 'formik';
import { FC } from 'react';
import { Alert } from 'react-native';
import {
  RECCURED_PAYMENT_MODAL_SCHEMA,
  RecurredPaymentModalValues,
} from './ReccuredPaymentModalForm.schema';
import {
  RecurredPaymentAmountField,
  RecurredPaymentNoteField,
} from './ReccuredPaymentModalForm.style';

type ReccuredPaymentModalFormProps = {
  onDismiss: () => void;
  expense: Expense;
};

const ReccuredPaymentModalForm: FC<ReccuredPaymentModalFormProps> = ({ onDismiss, expense }) => {
  const { mutateAsync: updateExpenseMutate } = useUpdateExpense(expense.id);

  const handleSubmit = async (values: RecurredPaymentModalValues) => {
    try {
      await updateExpenseMutate({
        amount: values.amount,
        description: values.description,
      });
      onDismiss();
      Alert.alert('Success', 'Expense updated successfully');
    } catch {
      Alert.alert('Error', 'Failed to update expense');
    }
  };

  return (
    <Formik<RecurredPaymentModalValues>
      onSubmit={handleSubmit}
      initialValues={{
        amount: expense?.amount,
        description: expense?.description,
      }}
      validationSchema={RECCURED_PAYMENT_MODAL_SCHEMA}
    >
      {({ handleBlur, handleChange, handleSubmit, values }) => (
        <Stack style={{ flexGrow: 1, gap: 24, paddingVertical: 24 }}>
          <Stack style={{ gap: 8, flexGrow: 1 }}>
            <RecurredPaymentAmountField
              onBlur={handleBlur('amount')}
              onChangeText={handleChange('amount')}
              value={values.amount.toString()}
            />
            <RecurredPaymentNoteField
              onBlur={handleBlur('transaction_date')}
              onChangeText={handleChange('transaction_date')}
              value={values.description}
            />
          </Stack>
          <Button text="Update" onPress={() => handleSubmit()} />
        </Stack>
      )}
    </Formik>
  );
};

export default ReccuredPaymentModalForm;
