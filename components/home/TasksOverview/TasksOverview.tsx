import { TabName } from '@/app/(tabs)/_layout';
import ItemValueBentoCard from '@/components/common/BentoCard/ItemValueBentoCard';
import Container from '@/components/common/Container';
import useTaskOverview from '@/hooks/services/task/useTaskOverview';
import { useNavigation } from 'expo-router';
import React from 'react';
import { TouchableOpacity } from 'react-native';

function TasksOverview() {
  const navigation = useNavigation();
  const { data } = useTaskOverview();

  const goToTaskList = () => {
    navigation.navigate(TabName.Todo as never);
  };

  return (
    <Container style={{ flexDirection: 'row', gap: 8 }}>
      <TouchableOpacity style={{ flex: 1 }} onPress={goToTaskList}>
        <ItemValueBentoCard value={data.totalTasks} label="Total Tasks" />
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={goToTaskList}>
        <ItemValueBentoCard value={data.dueToday} label="Due Today" />
      </TouchableOpacity>
      <TouchableOpacity style={{ flex: 1 }} onPress={goToTaskList}>
        <ItemValueBentoCard value={data.overdue} label="Overdue" />
      </TouchableOpacity>
    </Container>
  );
}

export default TasksOverview;
