import Container from '@/components/common/Container';
import TodoItem from './TodoItem/TodoItem';

const MOCK_TODOS = [
  {
    id: 't1',
    name: 'Buy milk',
    notes: 'From the store',
    dueDate: undefined,
  },
  { id: 't2', name: 'Read a book', notes: '', dueDate: '2024-07-14' },
  {
    id: 't3',
    name: 'Go to the gym',
    notes: 'Leg day',
    dueDate: '2024-07-14',
  },
  {
    id: 't4',
    name: 'Cook dinner',
    notes: 'Pasta',
    dueDate: '2024-07-14',
  },
];

export default function TodoList() {
  const todos = MOCK_TODOS;

  return (
    <Container style={{ gap: 8, paddingVertical: 16 }}>
      {todos.map(item => (
        <TodoItem
          key={item.id}
          id={item.id}
          name={item.name}
          notes={item.notes}
          dueDate={item.dueDate}
        />
      ))}
    </Container>
  );
}
