import Stack from '../common/Stack';
import ExpenseItem from './ExpenseItem';

const MOCK_EXPENSES = [
  {
    id: 'e1',
    name: 'Toilet Paper',
    amount: 94.12,
    date: '2024-07-14',
  },
  { id: 'e2', name: 'New TV', amount: 799.49, date: '2024-07-14' },
  {
    id: 'e3',
    name: 'Car Insurance',
    amount: 294.67,
    date: '2024-07-14',
  },
  {
    id: 'e4',
    name: 'New Desk (Wooden)',
    amount: 450,
    date: '2024-07-14',
  },
];
export default function ExpensesList() {
  const expenses = MOCK_EXPENSES;

  return (
    <Stack>
      {expenses.map(({ id, name, amount, date }) => (
        <ExpenseItem key={id} id={id} name={name} date={date} notes={''} />
      ))}
    </Stack>
  );
}
