import Container from '@/components/common/Container';
import MainHeader from '@/components/common/MainHeader';
import ThemedText from '@/components/common/ThemedText';
import TaskFilters from '@/components/tasks/TaskFilters';
import { colors } from '@/constants/Colors';
import { useCompleteTask } from '@/hooks/services/task/useCompleteTask';
import useTasks from '@/hooks/services/task/useTasks';
import { useUncompleteTask } from '@/hooks/services/task/useUncompleteTask';
import { GlobalSnackbar } from '@/managers/SnackbarManager';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { FlatList, TouchableOpacity, View } from 'react-native';
import EmptyTaskList from './EmptyTaskList';
import TaskItem, { TaskItemProps } from './TaskItem/TaskItem';
import { isSupportedTaskFilter } from './TaskList.utils';
import { TaskFilterTypes } from '@/hooks/services/task/task.types';

export default function TaskList() {
  const router = useRouter();
  const { filter } = useLocalSearchParams<{ filter?: string }>();
  const selectedFilter = isSupportedTaskFilter(filter) ? filter : 'Today';
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
          <ThemedText variant="header-sm" style={{ color: colors.v2.black }}>
            UNDO
          </ThemedText>
        </TouchableOpacity>
      ),
    });
  };

  const handleRevertItem: TaskItemProps['onRevert'] = id => {
    unCompleteTaskMutation(id);
  };

  const handleSelectFilter = (filter: TaskFilterTypes): void => {
    router.setParams({ defaultFilter: filter });
  };

  return (
    <FlatList
      data={tasks}
      contentContainerStyle={{ backgroundColor: colors.v2.black }}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      ListEmptyComponent={isLoading ? null : <EmptyTaskList filterType={selectedFilter} />}
      ListHeaderComponent={
        <>
          <MainHeader subtitle="Tasks" color={colors.v2.yellow} />
          <TaskFilters onSelectFilter={handleSelectFilter} selectedItem={selectedFilter} />
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
