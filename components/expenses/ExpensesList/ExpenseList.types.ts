import { ExpenseListItem } from '@/hooks/services/expense/expense.types';
import { CategoryItemFields } from './ExpensesList.utils';

export type ExpenseFlatListItems = CategoryItemFields | ExpenseListItem | { isFilter: boolean };
