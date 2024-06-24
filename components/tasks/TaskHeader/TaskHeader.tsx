import Container from '@/components/common/Container';
import { TabItem } from '@/components/common/Tabs/TabsItem';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { TaskFilterTypes } from '@/hooks/services/task/task.types';

export const TASK_FILTERS: TabItem<TaskFilterTypes>[] = [
  {
    key: 'All',
    value: 'All',
  },
  {
    key: 'Today',
    value: 'Today',
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

export default function TaskHeader() {
  return (
    <Container style={{ gap: 24, backgroundColor: colors.white, paddingTop: 24 }}>
      <ThemedText variant="heading" style={{ color: colors.black }}>
        Tasks
      </ThemedText>
    </Container>
  );
}
