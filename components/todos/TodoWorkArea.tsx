import TodoHeader from '@/components/todos/TodoHeader';
import { TodoFilters } from '@/components/todos/TodoHeader/TodoHeader';
import TodoList from '@/components/todos/TodoList';
import { useState } from 'react';
import { SafeAreaView, ScrollView } from 'react-native';

export default function TodoWorkArea() {
  const [selectedFilter, setSelectedFilter] = useState<TodoFilters>(TodoFilters.today);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TodoHeader onSelectFilter={setSelectedFilter} selectedItem={selectedFilter} />
      <ScrollView style={{ flex: 1 }}>
        <TodoList />
      </ScrollView>
    </SafeAreaView>
  );
}
