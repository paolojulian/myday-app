import TodoList from '@/components/tasks/TaskList';
import { SafeAreaView } from 'react-native';

export default function TaskWorkArea() {
  return (
    <SafeAreaView>
      <TodoList />
    </SafeAreaView>
  );
}
