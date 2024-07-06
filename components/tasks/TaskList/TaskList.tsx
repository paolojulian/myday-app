import Container from '@/components/common/Container';
import TaskFilters from '@/components/tasks/TaskFilters';
import TaskHeader from '@/components/tasks/TaskHeader';
import { Task, type TaskFilterTypes } from '@/hooks/services/task/task.types';
import { useCompleteTask } from '@/hooks/services/task/useCompleteTask';
import useTasks from '@/hooks/services/task/useTasks';
import { useState } from 'react';
import { FlatList, View } from 'react-native';
import TaskItem, { TaskItemProps } from './TaskItem/TaskItem';
import { colors } from '@/constants/Colors';

export default function TaskList() {
  const [selectedFilter, setSelectedFilter] = useState<TaskFilterTypes>('All');
  const { data } = useTasks({ filterType: selectedFilter });
  const tasks = data || [];

  const { mutateAsync: completeTaskMutation } = useCompleteTask();

  const handleRemoveItem: TaskItemProps['onRemove'] = id => {
    completeTaskMutation(id);
  };

  return (
    <FlatList
      style={{ backgroundColor: colors.slateGrey[100] }}
      data={[{ isFilter: true }, ...tasks]}
      contentContainerStyle={{ backgroundColor: colors.white }}
      renderItem={({ item }) => {
        if (isFilterItem(item)) {
          return <TaskFilters onSelectFilter={setSelectedFilter} selectedItem={selectedFilter} />;
        }

        if (isTaskItem(item)) {
          return (
            <Container>
              <TaskItem key={item.id} onRemove={handleRemoveItem} task={item} />
            </Container>
          );
        }

        return null;
      }}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      ListHeaderComponent={<TaskHeader />}
      ListFooterComponent={() => <View style={{ height: 16 }} />}
      stickyHeaderIndices={[1]}
    />
  );
}

function isFilterItem(item?: any): item is { isFilter: true } {
  return item && 'isFilter' in item;
}

function isTaskItem(item?: any): item is Task {
  return (
    item && 'id' in item && 'title' in item && 'description' in item && 'reminder_date' in item
  );
}
