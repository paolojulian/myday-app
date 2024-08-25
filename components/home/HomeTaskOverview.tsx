import { colors } from '@/constants/Colors';
import React from 'react';
import { View } from 'react-native';
import AppCard from '../common/AppCard';
import Stack from '../common/Stack';
import ThemedText from '../common/ThemedText';
import useTaskOverview from '@/hooks/services/task/useTaskOverview';

function HomeTaskOverview() {
  const { data } = useTaskOverview();

  return (
    <AppCard
      style={{
        backgroundColor: colors.v2.yellow,
        height: 240,
      }}
    >
      <Stack
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          height: '100%',
          gap: 24,
        }}
      >
        <View style={{ alignItems: 'center', gap: 8 }}>
          <ThemedText variant="header-lg" color="inverted">
            {data.dueToday}
          </ThemedText>
          <ThemedText variant="title-sm" color="inverted">
            Tasks Today
          </ThemedText>
        </View>
        <View style={{ alignItems: 'center', gap: 8 }}>
          <ThemedText variant="header-lg" color="inverted">
            {data.overdue}
          </ThemedText>
          <ThemedText variant="title-sm" color="inverted">
            Overdue
          </ThemedText>
        </View>
      </Stack>
    </AppCard>
  );
}

export default HomeTaskOverview;
