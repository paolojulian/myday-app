import ParallaxScrollView, { HEADER_HEIGHT } from '@/components/common/ParallaxScrollView';
import ThemedView from '@/components/common/ThemedView';
import TodoHeader, { TodoFilters } from '@/components/todos/TodoHeader/TodoHeader';
import TodoList from '@/components/todos/TodoList';
import { colors } from '@/constants/Colors';
import { useState } from 'react';

export default function TodoWorkArea() {
  const [selectedFilter, setSelectedFilter] = useState<TodoFilters>(TodoFilters.today);

  return (
    <ParallaxScrollView headerBackgroundColor={colors.black}>
      <ThemedView
        style={{
          marginTop: -HEADER_HEIGHT + 24,
          gap: 32,
        }}
      >
        <TodoHeader onSelectFilter={setSelectedFilter} selectedItem={selectedFilter} />

        <TodoList />
      </ThemedView>
    </ParallaxScrollView>
  );
}
