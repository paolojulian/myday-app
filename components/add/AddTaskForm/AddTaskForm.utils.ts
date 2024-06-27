import { SupportedCreateTaskFields } from '@/hooks/services/task/useCreateTask';
import { convertDateToEpoch } from '@/utils/date/date.utils';
import * as Yup from 'yup';

export const ADD_TASK_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string().max(40).required('Title is required'),
  description: Yup.string().max(255),
  category: Yup.string(),
  reminderDate: Yup.date().optional(),
  toBuy: Yup.boolean().optional(),
  amount: Yup.string().optional(),
});
export type TaskFormValues = Yup.InferType<typeof ADD_TASK_VALIDATION_SCHEMA>;

export function convertTaskFormToTask(taskForm: TaskFormValues): SupportedCreateTaskFields {
  return {
    title: taskForm.title,
    description: taskForm.description ?? '',
    is_completed: 0,
    to_buy: taskForm.toBuy ? 1 : 0,
    expected_amount: taskForm.amount ? parseFloat(taskForm.amount) : null,
    reminder_date: taskForm.reminderDate ? convertDateToEpoch(taskForm.reminderDate) : null,
  };
}

export const NOTE_PLACEHOLDER = `e.g.
Dish soap
Soy sauce
Toilet paper
etc..`;
