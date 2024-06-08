import Container from '@/components/common/Container';
import Tabs from '@/components/common/Tabs';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';

export enum TodoFilters {
  today = 'Today',
  future = 'Future',
  completed = 'Completed',
}
export const TODO_FILTERS: TodoFilters[] = [
  TodoFilters.today,
  TodoFilters.future,
  TodoFilters.completed,
];

type TodoHeaderProps = {
  onSelectFilter: (filter: TodoFilters) => void;
  selectedItem: TodoFilters;
};

export default function TodoHeader({ onSelectFilter, selectedItem }: TodoHeaderProps) {
  return (
    <Container
      style={{
        flexDirection: 'column',
        backgroundColor: colors.black,
        paddingVertical: 24,
        gap: 32,
        justifyContent: 'flex-end',
      }}
    >
      <ThemedText variant="heading" style={{ color: colors.white }}>
        Todo
      </ThemedText>

      <Tabs<TodoFilters>
        items={TODO_FILTERS}
        onSelect={onSelectFilter}
        selectedItem={selectedItem}
        variant="inverted"
      />
    </Container>
  );
}
