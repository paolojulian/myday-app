import BottomSheetModal from '@/components/common/BottomSheetModal';
import Button from '@/components/common/Button';
import TextField from '@/components/common/forms/TextField';
import ThemedView from '@/components/common/ThemedView';
import useBudget from '@/hooks/services/budget/useBudget';
import useSetBudget from '@/hooks/services/budget/useSetBudget';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import {
  convertToCurrencyFormatter,
  currencyCleaner,
} from '@/utils/formatters/convert-to-currency.formatter';
import { Formik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import EventEmitter from 'react-native/Libraries/vendor/emitter/EventEmitter';
import * as Yup from 'yup';

const budgetModalManager = new EventEmitter();

enum UpdateBudgetEvent {
  SHOW = 'show',
  HIDE = 'hide',
}

function show() {
  console.log('showing');
  budgetModalManager.emit(UpdateBudgetEvent.SHOW);
}
function hide() {
  console.log('hiding');
  budgetModalManager.emit(UpdateBudgetEvent.HIDE);
}

export const UpdateBudgetManager = {
  show,
  hide,
};

const validationSchema = Yup.object().shape({
  amount: Yup.number()
    .nullable()
    .transform(
      (value, originalValue) => (String(originalValue).trim() === '' ? null : value), // Transform empty string to null
    )
    .typeError('Please enter a valid amount')
    .positive('Amount must be positive')
    .max(9999999, 'Amount is too large'),
});
export type UpdateBudgetSchema = Yup.InferType<typeof validationSchema>;

function UpdateBudgetBottomSheet() {
  const today = useMemo(() => new Date(), []);
  const [isOpen, setIsOpen] = useState(false);
  const { data: budget, isLoading } = useBudget(today);
  const { mutateAsync: setBudgetMutate } = useSetBudget();

  const currentMonthlyBudget = budget?.amount ?? null;
  const saveButtonText = currentMonthlyBudget ? 'Update' : 'Save';

  const handleSavePressed = async (values: UpdateBudgetSchema) => {
    if (values.amount) {
      let resolvedAmount: number = values.amount;
      if (typeof values.amount === 'string') {
        resolvedAmount = currencyCleaner(values.amount);
      }
      await setBudgetMutate(resolvedAmount);
      hide();
      GlobalSnackbar.show({
        message: 'Budget updated',
        type: 'success',
      });
    }
  };

  const handleHide = () => {
    setIsOpen(false);
  };

  const handleShow = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    budgetModalManager.addListener(UpdateBudgetEvent.SHOW, handleShow);
    budgetModalManager.addListener(UpdateBudgetEvent.HIDE, handleHide);

    return () => {
      budgetModalManager.removeAllListeners(UpdateBudgetEvent.SHOW);
      budgetModalManager.removeAllListeners(UpdateBudgetEvent.HIDE);
    };
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <>
      <BottomSheetModal variant="slide" onClose={handleHide} isOpen={isOpen}>
        <ThemedView style={{ gap: 16, paddingVertical: 16 }}>
          <Formik
            onSubmit={handleSavePressed}
            initialValues={{
              amount: currentMonthlyBudget,
            }}
            validationSchema={validationSchema}
          >
            {({ handleSubmit, setFieldValue, errors, touched, values }) => (
              <>
                <TextField
                  onChangeText={value => setFieldValue('amount', currencyCleaner(value))}
                  autoFocus
                  formatter={convertToCurrencyFormatter}
                  label="Monthly budget"
                  keyboardType="numeric"
                  placeholder="Enter your monthly budget"
                  value={values.amount?.toString()}
                  isError={!!touched.amount && !!errors.amount}
                  errorMessage={errors.amount}
                />
                <Button text={saveButtonText} onPress={() => handleSubmit()} />
              </>
            )}
          </Formik>
        </ThemedView>
      </BottomSheetModal>
    </>
  );
}

export default UpdateBudgetBottomSheet;
