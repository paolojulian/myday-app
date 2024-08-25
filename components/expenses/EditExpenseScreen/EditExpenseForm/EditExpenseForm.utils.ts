import * as Yup from 'yup';

export const EDIT_EXPENSE_FORM_TEST_IDS = {
  title: 'add-expense-form-title',
  category: 'add-expense-form-category',
  amount: 'add-expense-form-amount',
  description: 'add-expense-form-description',
  saveButton: 'add-expense-form-save-button',
};

export const EDIT_EXPENSE_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string().max(40).required('Title is required'),
  category: Yup.string().max(100),
  amount: Yup.string().required('Amount is required'),
  description: Yup.string().max(255),
  transactionDate: Yup.date().required('Transaction date is required'),
  recurrence: Yup.string().oneOf(['monthly', 'weekly', 'yearly']).nullable().default(null),
});
export type EditExpenseFormValues = Yup.InferType<typeof EDIT_EXPENSE_VALIDATION_SCHEMA>;

export function resolveFieldName(fieldName: keyof EditExpenseFormValues) {
  switch (fieldName) {
    case 'category':
      return 'category_id';
    case 'transactionDate':
      return 'transaction_date';
    default:
      return fieldName;
  }
}
