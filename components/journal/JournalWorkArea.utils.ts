import dayjs from 'dayjs';
import * as Yup from 'yup';

export function formatDateFilter(date: Date): string {
  if (dayjs(date).isSame(dayjs(), 'day')) {
    return 'Today';
  }
  if (dayjs(date).isSame(dayjs().subtract(1, 'day'), 'day')) {
    return 'Yesterday';
  }
  if (dayjs(date).isSame(dayjs().add(1, 'day'), 'day')) {
    return 'Tomorrow';
  }
  if (dayjs(date).isSame(dayjs(), 'year')) {
    return dayjs(date).format('MMM D');
  }
  return dayjs(date).format('MMM D, YYYY');
}

export const JOURNAL_VALIDATION_SCHEMA = Yup.object().shape({
  title: Yup.string().max(40),
  description: Yup.string().max(3000),
});
export type JournalFormValues = Yup.InferType<typeof JOURNAL_VALIDATION_SCHEMA>;
