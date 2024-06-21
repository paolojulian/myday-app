import Container from '@/components/common/Container';
import { HEADER_HEIGHT } from '@/components/common/ParallaxScrollView';
import Tabs from '@/components/common/Tabs';
import { TabItem } from '@/components/common/Tabs/TabsItem';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { TaskFilters } from '@/hooks/services/task/task.types';

export const TASK_FILTERS: TabItem<TaskFilters>[] = [
  {
    key: 'Today',
    value: 'Today',
  },
  {
    key: 'All',
    value: 'All',
  },
  {
    key: 'Scheduled',
    value: 'Scheduled',
  },
  {
    key: 'Completed',
    value: 'Completed',
  },
];

type TodoHeaderProps = {
  onSelectFilter: (filter: TaskFilters) => void;
  selectedItem: TaskFilters;
};

export default function TaskHeader({ onSelectFilter, selectedItem }: TodoHeaderProps) {
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

      <Tabs<TaskFilters>
        items={TASK_FILTERS}
        onSelect={onSelectFilter}
        selectedItem={selectedItem}
        variant="inverted"
        isCompact
      />
    </Container>
  );
}
