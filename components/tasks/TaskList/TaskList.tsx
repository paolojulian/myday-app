import Container from '@/components/common/Container';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskHeader from '@/components/tasks/TaskHeader';
import { colors } from '@/constants/Colors';
import { type TaskFilterTypes } from '@/hooks/services/task/task.types';
import { useCompleteTask } from '@/hooks/services/task/useCompleteTask';
import useTasks from '@/hooks/services/task/useTasks';
import { useState } from 'react';
import { FlatList, TouchableOpacity, View } from 'react-native';
import TaskItem, { TaskItemProps } from './TaskItem/TaskItem';
import EmptyTaskList from './EmptyTaskList';
import { useUncompleteTask } from '@/hooks/services/task/useUncompleteTask';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import ThemedText from '@/components/common/ThemedText';

export default function TaskList() {
  const [selectedFilter, setSelectedFilter] = useState<TaskFilterTypes>('All');
  const { data, isLoading } = useTasks({ filterType: selectedFilter });
  const tasks = data || [];

  const { mutateAsync: completeTaskMutation } = useCompleteTask();
  const { mutateAsync: unCompleteTaskMutation } = useUncompleteTask();

  const handleRemoveItem: TaskItemProps['onRemove'] = async (id): Promise<void> => {
    await completeTaskMutation(id);
    GlobalSnackbar.show({
      message: 'Task removed',
      duration: GlobalSnackbar.LENGTH_LONG,
      type: 'success',
      RightComponent: (
        <TouchableOpacity
          onPress={() => {
            unCompleteTaskMutation(id);
          }}
        >
          <ThemedText variant="body2" style={{ color: colors.white }}>
            UNDO
          </ThemedText>
        </TouchableOpacity>
      ),
    });
  };

  const handleRevertItem: TaskItemProps['onRevert'] = id => {
    unCompleteTaskMutation(id);
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
          <TaskItem
            key={item.id}
            onRemove={handleRemoveItem}
            onRevert={handleRevertItem}
            task={item}
          />
        </Container>
      )}
    />
  );
}
