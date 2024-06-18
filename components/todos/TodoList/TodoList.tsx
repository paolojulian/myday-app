import Container from '@/components/common/Container';
import TodoItem, { TodoItemProps } from './TodoItem/TodoItem';
import { Alert } from 'react-native';
import { useState } from 'react';

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
  const [todos, setTodos] = useState(MOCK_TODOS);

  const handleRemoveItem: TodoItemProps['onRemove'] = id => {
    Alert.alert(`Item with id ${id} has been removed`);
    setTodos(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Container style={{ gap: 8, paddingBottom: 16 }}>
      {todos.map(item => (
        <TodoItem
          onRemove={handleRemoveItem}
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
