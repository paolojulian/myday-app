import Container from '@/components/common/Container';
import TaskFilters from '@/components/tasks/TaskFilters';
import { Task, type TaskFilterTypes } from '@/hooks/services/task/task.types';
import useTasks from '@/hooks/services/task/useTasks';
import { useState } from 'react';
import { Alert, FlatList, View } from 'react-native';
import TaskItem, { TaskItemProps } from './TaskItem/TaskItem';
import TaskHeader from '@/components/tasks/TaskHeader';

export default function TaskList() {
  const [selectedFilter, setSelectedFilter] = useState<TaskFilterTypes>('All');
  const { data } = useTasks({ filterType: selectedFilter });
  const tasks = data || [];

  const handleRemoveItem: TaskItemProps['onRemove'] = id => {
    Alert.alert(`Item with id ${id} has been removed`);
    // setTodos(prev => prev.filter(item => item.id !== id));
  };

  return (
    <FlatList
      data={[{ isFilter: true }, ...tasks]}
      renderItem={({ item }) => {
        if (isFilterItem(item)) {
          return <TaskFilters onSelectFilter={setSelectedFilter} selectedItem={selectedFilter} />;
        }

        if (isTaskItem(item)) {
          return (
            <Container>
              <TaskItem
                onRemove={handleRemoveItem}
                key={item.id}
                id={item.id}
                name={item.title}
                notes={item.description}
                reminderDate={item.reminder_date}
              />
            </Container>
          );
        }

        return null;
      }}
      ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
      ListHeaderComponent={<TaskHeader />}
      ListFooterComponent={() => <View style={{ height: 16 }} />}
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
