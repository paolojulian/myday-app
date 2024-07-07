import Container from '@/components/common/Container';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskHeader from '@/components/tasks/TaskHeader';
import { colors } from '@/constants/Colors';
import { type TaskFilterTypes } from '@/hooks/services/task/task.types';
import { useCompleteTask } from '@/hooks/services/task/useCompleteTask';
import useTasks from '@/hooks/services/task/useTasks';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import TaskItem, { TaskItemProps } from './TaskItem/TaskItem';
import EmptyTaskList from './EmptyTaskList';

export default function TaskList() {
  const [selectedFilter, setSelectedFilter] = useState<TaskFilterTypes>('All');
  const { data, isLoading } = useTasks({ filterType: selectedFilter });
  const tasks = data || [];

  const { mutateAsync: completeTaskMutation } = useCompleteTask();

  const handleRemoveItem: TaskItemProps['onRemove'] = id => {
    completeTaskMutation(id);
  };

  return (
    <FlatList
      data={tasks}
      contentContainerStyle={{ backgroundColor: colors.white }}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      ListEmptyComponent={isLoading ? null : <EmptyTaskList filterType={selectedFilter} />}
      ListHeaderComponent={
        <>
          <TaskHeader />
          <TaskFilters onSelectFilter={setSelectedFilter} selectedItem={selectedFilter} />
        </>
      }
      ListFooterComponent={<View style={{ paddingBottom: 24 }} />}
      stickyHeaderIndices={[0]}
      renderItem={({ item }) => (
        <Container>
          <TaskItem key={item.id} onRemove={handleRemoveItem} task={item} />
        </Container>
      )}
    />
  );
}
