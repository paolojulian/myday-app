import Container from '@/components/common/Container';
import { TaskFilters } from '@/hooks/services/task/task.types';
import useTasks from '@/hooks/services/task/useTasks';
import { Alert } from 'react-native';
import TaskItem, { TodoItemProps } from './TaskItem/TaskItem';

type TaskListProps = {
  filterType: TaskFilters;
};

export default function TaskList({ filterType }: TaskListProps) {
  const { data: tasks } = useTasks({ filterType });

  const handleRemoveItem: TodoItemProps['onRemove'] = id => {
    Alert.alert(`Item with id ${id} has been removed`);
    // setTodos(prev => prev.filter(item => item.id !== id));
  };

  return (
    <Container style={{ gap: 8, paddingBottom: 16 }}>
      {tasks?.map(item => (
        <TaskItem
          onRemove={handleRemoveItem}
          key={item.id}
          id={item.id}
          name={item.title}
          notes={item.description}
          reminderDate={item.reminder_date}
        />
      ))}
    </Container>
  );
}
