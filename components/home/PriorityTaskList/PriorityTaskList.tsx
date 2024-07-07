import { TabName } from '@/app/(tabs)/_layout';
import BentoCard from '@/components/common/BentoCard';
import Container from '@/components/common/Container';
import LinkText from '@/components/common/LinkText';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import TaskItem from '@/components/tasks/TaskList/TaskItem';
import { usePriorityTasks } from '@/hooks/services/task/usePriorityTasks';
import { useNavigation } from 'expo-router';
import React from 'react';
import EmptyPriorityTasks from './EmptyPriorityTasks';
import { useCompleteTask } from '@/hooks/services/task/useCompleteTask';
import { TaskItemProps } from '@/components/tasks/TaskList/TaskItem/TaskItem';

function PriorityTaskList() {
  const navigation = useNavigation();
  const { data: tasks } = usePriorityTasks();

  const handleViewAllPress = () => {
    navigation.navigate(TabName.Todo as never);
  };

  const { mutateAsync: completeTaskMutation } = useCompleteTask();

  const handleRemoveItem: TaskItemProps['onRemove'] = id => {
    completeTaskMutation(id);
  };

  const isEmpty = !tasks || tasks.length === 0;

  return (
    <Container>
      <BentoCard>
        {/* Title */}
        <Stack style={{ gap: 16 }}>
          <ThemedText variant="body2">Priority Tasks</ThemedText>
          {isEmpty ? <EmptyPriorityTasks /> : null}
          {!isEmpty ? (
            <>
              {/* List */}
              <Stack style={{ gap: 8 }}>
                {tasks?.map(task => (
                  <TaskItem key={task.id} onRemove={handleRemoveItem} task={task} />
                ))}
              </Stack>
              {/* View All */}
              <Row style={{ justifyContent: 'center' }}>
                <LinkText onPress={handleViewAllPress} text="View all" />
              </Row>
            </>
          ) : null}
        </Stack>
      </BentoCard>
    </Container>
  );
}

export default PriorityTaskList;
