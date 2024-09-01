import * as Yup from 'yup';

export const EDIT_TASK_FORM_SCHEMA = Yup.object().shape({
  title: Yup.string().max(40).required('Title is required'),
  description: Yup.string().max(255, 'Description should be less than 255 characters'),
  category: Yup.string(),
  reminderDate: Yup.date().optional(),
  amount: Yup.string().optional(),
});

export type EditTaskFormValues = Yup.InferType<typeof EDIT_TASK_FORM_SCHEMA>;
