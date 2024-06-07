import TodoHeader from '@/components/todos/TodoHeader';
import TodoList from '@/components/todos/TodoList';
import { SafeAreaView, ScrollView } from 'react-native';

export default function TodoWorkArea() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TodoHeader />
      <ScrollView style={{ flex: 1 }}>
        <TodoList />
      </ScrollView>
    </SafeAreaView>
  );
}
