import Container from '@/components/common/Container';
import { HEADER_HEIGHT } from '@/components/common/ParallaxScrollView';
import Tabs from '@/components/common/Tabs';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';

export enum TodoFilters {
  today = 'Today',
  scheduled = 'Scheduled',
  all = 'All',
  completed = 'Completed',
}
export const TODO_FILTERS: TodoFilters[] = [
  TodoFilters.today,
  TodoFilters.all,
  TodoFilters.scheduled,
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
        gap: 24,
        height: HEADER_HEIGHT / 2,
      }}
    >
      <ThemedText variant="heading" style={{ color: colors.white }}>
        Todo list
      </ThemedText>

      <Tabs<TodoFilters>
        items={TODO_FILTERS}
        onSelect={onSelectFilter}
        selectedItem={selectedItem}
        variant="inverted"
        isCompact
      />
    </Container>
  );
}
