import TaskList from '@/components/tasks/TaskList';
import AppSafeAreaView from '../common/AppSafeAreaView';
import GlowingHeader from '../common/GlowingHeader';

export default function TaskWorkArea() {
  return (
    <AppSafeAreaView edges={['top']}>
      <GlowingHeader variant="yellow" />
      <TaskList />
    </AppSafeAreaView>
  );
}
