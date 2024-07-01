import BentoCard from '@/components/common/BentoCard';
import Container from '@/components/common/Container';
import LinkText from '@/components/common/LinkText';
import Row from '@/components/common/Row';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import TaskItem from '@/components/tasks/TaskList/TaskItem';
import React from 'react';

function PriorityTaskList() {
  const handleViewAllPress = () => {};

  return (
    <Container>
      <BentoCard>
        {/* Title */}
        <Stack style={{ gap: 16 }}>
          <ThemedText variant="heading">Priority Tasks</ThemedText>
          {/* List */}
          <Stack style={{ gap: 8 }}>
            <TaskItem id={2} name="Test" notes="Test" onRemove={() => {}} reminderDate={null} />
            <TaskItem id={2} name="Test" notes="Test" onRemove={() => {}} reminderDate={null} />
            <TaskItem id={2} name="Test" notes="Test" onRemove={() => {}} reminderDate={null} />
          </Stack>
          {/* View All */}
          <Row style={{ justifyContent: 'center' }}>
            <LinkText onPress={handleViewAllPress} text="View all" />
          </Row>
        </Stack>
      </BentoCard>
    </Container>
  );
}

export default PriorityTaskList;
