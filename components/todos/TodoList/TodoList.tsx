import { FlatList } from 'react-native';
import TodoItem from './TodoItem/TodoItem';

const MOCK_TODOS = [
  {
    id: 't1',
    name: 'Buy milk',
    notes: 'From the store',
    reminderDate: undefined,
  },
  { id: 't2', name: 'Read a book', notes: '', reminderDate: '2024-07-14' },
  {
    id: 't3',
    name: 'Go to the gym',
    notes: 'Leg day',
    reminderDate: '2024-07-14',
  },
  {
    id: 't4',
    name: 'Cook dinner',
    notes: 'Pasta',
    reminderDate: '2024-07-14',
  },
];

export default function TodoList() {
  const todos = MOCK_TODOS;

  return (
    <FlatList
      style={{
        flex: 1,
      }}
      renderItem={({ item }) => (
        <TodoItem
          id={item.id}
          name={item.name}
          notes={item.notes}
          reminderDate={item.reminderDate}
        />
      )}
      data={todos}
      keyExtractor={item => item.id}
    ></FlatList>
  );
}
