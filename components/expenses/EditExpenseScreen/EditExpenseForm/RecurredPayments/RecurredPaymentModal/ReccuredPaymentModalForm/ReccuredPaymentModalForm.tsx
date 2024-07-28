import Button from '@/components/common/Button';
import Stack from '@/components/common/Stack';
import { Expense } from '@/hooks/services/expense/expense.types';
import { Formik } from 'formik';
import { FC } from 'react';
import {
  RECCURED_PAYMENT_MODAL_SCHEMA,
  RecurredPaymentModalValues,
} from './ReccuredPaymentModalForm.schema';
import {
  RecurredPaymentAmountField,
  RecurredPaymentNoteField,
} from './ReccuredPaymentModalForm.style';

type ReccuredPaymentModalFormProps = {
  expense: Expense;
};

const ReccuredPaymentModalForm: FC<ReccuredPaymentModalFormProps> = ({ expense }) => {
  return (
    <Formik<RecurredPaymentModalValues>
      onSubmit={() => {}}
      initialValues={{
        amount: expense?.amount,
        description: expense?.description,
      }}
      validationSchema={RECCURED_PAYMENT_MODAL_SCHEMA}
    >
      {({ handleBlur, handleChange, values }) => (
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
          <Button text="Update" onPress={() => {}} />
        </Stack>
      )}
    </Formik>
  );
};

export default ReccuredPaymentModalForm;
