import * as Yup from 'yup';

export const ADD_EXPENSE_FORM_TEST_IDS = {
  title: 'add-expense-form-title',
  category: 'add-expense-form-category',
  amount: 'add-expense-form-amount',
  description: 'add-expense-form-description',
  saveButton: 'add-expense-form-save-button',
};

export const ADD_EXPENSE_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string().max(40).required('Title is required'),
  category: Yup.string().max(100),
  amount: Yup.string().required('Amount is required'),
  description: Yup.string().max(255),
  transactionDate: Yup.date().required('Transaction date is required'),
  recurrence: Yup.string().oneOf(['monthly', 'weekly', 'yearly']).nullable(),
});
export type ExpenseFormValues = Yup.InferType<typeof ADD_EXPENSE_VALIDATION_SCHEMA>;
