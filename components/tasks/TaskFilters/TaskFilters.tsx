import Container from '@/components/common/Container';
import Tabs from '@/components/common/Tabs';
import { TabItem } from '@/components/common/Tabs/TabsItem';
import { colors } from '@/constants/Colors';
import { type TaskFilterTypes } from '@/hooks/services/task/task.types';
import { ScrollView } from 'react-native';

const TASK_FILTERS: TabItem<TaskFilterTypes>[] = [
  {
    key: 'Today',
    value: 'Today',
  },
  {
    key: 'Tomorrow',
    value: 'Tomorrow',
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

type TaskFilterProps = {
  onSelectFilter: (filter: TaskFilterTypes) => void;
  selectedItem: TaskFilterTypes;
};

export default function TaskFilters({ onSelectFilter, selectedItem }: TaskFilterProps) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false}>
      <Container style={{ backgroundColor: colors.v2.black, paddingVertical: 16 }}>
        <Tabs<TaskFilterTypes>
          items={TASK_FILTERS}
          onSelect={onSelectFilter}
          selectedItem={selectedItem}
          variant="default-separated"
          isCompact
        />
      </Container>
    </ScrollView>
  );
}
