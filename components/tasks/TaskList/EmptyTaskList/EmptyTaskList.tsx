import { RouteNames } from '@/app/_layout';
import { SupportedAddItems } from '@/app/add';
import Container from '@/components/common/Container';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import { colors } from '@/constants/Colors';
import { TaskFilterTypes } from '@/hooks/services/task/task.types';
import { router } from 'expo-router';
import React from 'react';
import { Image, TouchableOpacity } from 'react-native';

type EmptyTaskListProps = {
  filterType: TaskFilterTypes;
};

function EmptyTaskList({ filterType }: EmptyTaskListProps) {
  return (
    <Container>
      <Stack
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          gap: 24,
          flex: 1,
          paddingTop: 24,
        }}
      >
        <Image
          style={{ width: 220, height: 230 }}
          source={require('../../../../assets/images/empty-tasks.png')}
        />

        <RenderEmptyText filterType={filterType} />
      </Stack>
    </Container>
  );
}

function RenderEmptyText({ filterType }: { filterType: TaskFilterTypes }) {
  switch (filterType) {
    case 'Completed':
      return <NoCompletedTasks />;
    case 'Scheduled':
      return <NoScheduledTasks />;
    case 'Today':
      return <NoTasksToday />;
    case 'All':
      return <NoTasksSet />;
    default:
      return null;
  }
}

function NoTasksSet() {
  return (
    <Stack style={{ alignItems: 'center', gap: 24 }}>
      <Stack style={{ alignItems: 'center', gap: 8 }}>
        <ThemedText variant="heading">No Task Set</ThemedText>
        <ThemedText
          variant="body"
          style={{ textAlign: 'center', color: colors.slateGrey[500], maxWidth: 300 }}
        >
          Add tasks to start organizing your to-dos and know exactly what needs to be done.
        </ThemedText>
      </Stack>

      <TapToCreateTask />
    </Stack>
  );
}

function NoTasksToday() {
  return (
    <Stack style={{ alignItems: 'center', gap: 24 }}>
      <Stack style={{ alignItems: 'center', gap: 8 }}>
        <ThemedText variant="heading">No Task Due Today</ThemedText>
        <ThemedText
          variant="body"
          style={{ textAlign: 'center', color: colors.slateGrey[500], maxWidth: 300 }}
        >
          You can now relax or add additional hustles.
        </ThemedText>
      </Stack>

      <TapToCreateTask />
    </Stack>
  );
}

function NoScheduledTasks() {
  return (
    <Stack style={{ alignItems: 'center', gap: 24 }}>
      <Stack style={{ alignItems: 'center', gap: 8 }}>
        <ThemedText variant="heading">No Scheduled Tasks</ThemedText>
      </Stack>

      <TapToCreateTask />
    </Stack>
  );
}

function NoCompletedTasks() {
  return (
    <Stack style={{ alignItems: 'center', gap: 24 }}>
      <Stack style={{ alignItems: 'center', gap: 8 }}>
        <ThemedText variant="heading">No Completed Tasks</ThemedText>
        <ThemedText
          variant="body"
          style={{ textAlign: 'center', color: colors.slateGrey[500], maxWidth: 300 }}
        >
          Finish something...
        </ThemedText>
      </Stack>
    </Stack>
  );
}
function TapToCreateTask() {
  const handlePress = () => {
    router.push({
      pathname: RouteNames.Add,
      params: {
        defaultType: 'Todo' satisfies SupportedAddItems,
      },
    });
  };

  return (
    <TouchableOpacity onPress={handlePress}>
      <ThemedText variant="body" style={{ color: colors.blueLink }}>
        Tap here to create a new task
      </ThemedText>
    </TouchableOpacity>
  );
}

export default EmptyTaskList;
