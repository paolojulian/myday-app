import { ExpenseListItem } from '@/hooks/services/expense/expense.types';
export const mockExpensesWithCategoryName: ExpenseListItem[] = [
  {
    id: 1,
    title: 'Grocery Shopping',
    amount: 50.0,
    description: 'Weekly groceries',
    category_id: 1,
    category_name: 'Food',
    transaction_date: 1672531200000,
    recurrence: null,
    recurrence_id: null,
    created_at: 1672531200000,
    updated_at: 1672531200000,
    deleted_at: null,
    recurred_items: [],
  },
  {
    id: 2,
    title: 'Bus Ticket',
    amount: 2.5,
    description: 'Daily commute',
    category_id: 2,
    category_name: 'Transportation',
    transaction_date: 1672617600000,
    recurrence: null,
    recurrence_id: null,
    created_at: 1672617600000,
    updated_at: 1672617600000,
    deleted_at: null,
    recurred_items: [],
  },
  {
    id: 3,
    title: 'Movie Night',
    amount: 15.0,
    description: 'Watched a movie',
    category_id: 3,
    category_name: 'Entertainment',
    transaction_date: 1672704000000,
    recurrence: null,
    recurrence_id: null,
    created_at: 1672704000000,
    updated_at: 1672704000000,
    deleted_at: null,
    recurred_items: [],
  },
  {
    id: 4,
    title: 'Lunch',
    amount: 12.0,
    description: 'Lunch with friends',
    category_id: 1,
    category_name: 'Food',
    transaction_date: 1672790400000,
    recurrence: null,
    recurrence_id: null,
    created_at: 1672790400000,
    updated_at: 1672790400000,
    deleted_at: null,
    recurred_items: [],
  },
  {
    id: 5,
    title: 'Taxi Ride',
    amount: 20.0,
    description: 'Taxi to airport',
    category_id: 2,
    category_name: 'Transportation',
    transaction_date: 1672876800000,
    recurrence: null,
    recurrence_id: null,
    created_at: 1672876800000,
    updated_at: 1672876800000,
    deleted_at: null,
    recurred_items: [],
  },
  {
    id: 6,
    title: 'Unknown Expense',
    amount: 30.0,
    description: 'No category',
    category_id: null,
    category_name: null,
    transaction_date: 1672963200000,
    recurrence: null,
    recurrence_id: null,
    created_at: 1672963200000,
    updated_at: 1672963200000,
    deleted_at: null,
    recurred_items: [],
  },
];
