import Container from '@/components/common/Container';
import Tabs from '@/components/common/Tabs';
import { TASK_FILTERS } from '@/components/tasks/TaskHeader/TaskHeader';
import { colors } from '@/constants/Colors';
import { type TaskFilterTypes } from '@/hooks/services/task/task.types';

type TaskFilterProps = {
  onSelectFilter: (filter: TaskFilterTypes) => void;
  selectedItem: TaskFilterTypes;
};

export default function TaskFilters({ onSelectFilter, selectedItem }: TaskFilterProps) {
  return (
    <Container style={{ backgroundColor: colors.black, paddingVertical: 16 }}>
      <Tabs<TaskFilterTypes>
        items={TASK_FILTERS}
        onSelect={onSelectFilter}
        selectedItem={selectedItem}
        variant="inverted"
        isCompact
      />
    </Container>
  );
}
