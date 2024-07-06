import ItemValueBentoCard from '@/components/common/BentoCard/ItemValueBentoCard';
import Container from '@/components/common/Container';
import useTaskOverview from '@/hooks/services/task/useTaskOverview';
import React from 'react';

function TasksOverview() {
  const { data } = useTaskOverview();

  return (
    <Container style={{ flexDirection: 'row', gap: 8 }}>
      <ItemValueBentoCard value={data.totalTasks} label="Total Tasks" />
      <ItemValueBentoCard value={data.dueToday} label="Due Today" />
      <ItemValueBentoCard value={data.overdue} label="Overdue" />
    </Container>
  );
}

export default TasksOverview;
