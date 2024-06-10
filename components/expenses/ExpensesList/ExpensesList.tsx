import Container from '@/components/common/Container';
import ExpenseItem from './ExpensesListItem/ExpenseItem';

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
  {
    id: 'e5',
    name: 'Groceries',
    amount: 150.25,
    date: '2024-07-14',
  },
  {
    id: 'e6',
    name: 'Movie Tickets',
    amount: 50.75,
    date: '2024-07-14',
  },
  {
    id: 'e7',
    name: 'Restaurant Dinner',
    amount: 80.99,
    date: '2024-07-14',
  },
  {
    id: 'e8',
    name: 'Gym Membership',
    amount: 200,
    date: '2024-07-14',
  },
  {
    id: 'e9',
    name: 'Phone Bill',
    amount: 75.5,
    date: '2024-07-14',
  },
  {
    id: 'e10',
    name: 'Vacation',
    amount: 1500,
    date: '2024-07-14',
  },
  {
    id: 'e11',
    name: 'Books',
    amount: 120.75,
    date: '2024-07-14',
  },
  {
    id: 'e12',
    name: 'Clothes',
    amount: 250.99,
    date: '2024-07-14',
  },
  {
    id: 'e13',
    name: 'Home Decor',
    amount: 300,
    date: '2024-07-14',
  },
  {
    id: 'e14',
    name: 'Gifts',
    amount: 100.5,
    date: '2024-07-14',
  },
];

export default function ExpensesList() {
  const expenses = MOCK_EXPENSES;

  return (
    <Container style={{ gap: 8 }}>
      {expenses.map(item => (
        <ExpenseItem
          key={item.id}
          onDelete={() => {}}
          id={item.id}
          date={item.date}
          name={item.name}
          notes=""
          amount={item.amount}
        />
      ))}
    </Container>
  );
}
