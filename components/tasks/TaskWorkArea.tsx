import TodoList from '@/components/tasks/TaskList';
import AppSafeAreaView from '../common/AppSafeAreaView';

export default function TaskWorkArea() {
  return (
    <AppSafeAreaView>
      <TodoList />
    </AppSafeAreaView>
  );
}
