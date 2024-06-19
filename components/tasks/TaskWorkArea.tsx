import ParallaxScrollView, { HEADER_HEIGHT } from '@/components/common/ParallaxScrollView';
import ThemedView from '@/components/common/ThemedView';
import TodoList from '@/components/tasks/TaskList';
import TaskHeader from '@/components/tasks/TaskHeader/TaskHeader';
import { colors } from '@/constants/Colors';
import { TaskFilters } from '@/hooks/services/task/task.types';
import { useState } from 'react';

export default function TaskWorkArea() {
  const [selectedFilter, setSelectedFilter] = useState<TaskFilters>('Today');

  return (
    <ParallaxScrollView headerBackgroundColor={colors.black}>
      <ThemedView
        style={{
          marginTop: -HEADER_HEIGHT + 24,
          gap: 32,
        }}
      >
        <TaskHeader onSelectFilter={setSelectedFilter} selectedItem={selectedFilter} />

        <TodoList filterType={selectedFilter} />
      </ThemedView>
    </ParallaxScrollView>
  );
}
