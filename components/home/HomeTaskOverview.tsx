import { TabName } from '@/app/(tabs)/_layout';
import { colors } from '@/constants/Colors';
import useTaskOverview from '@/hooks/services/task/useTaskOverview';
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import AppCard from '../common/AppCard';
import Stack from '../common/Stack';
import ThemedText from '../common/ThemedText';

function HomeTaskOverview() {
  const { data } = useTaskOverview();

  const handlePress = () => {
    router.push(TabName.Todo);
  };

  return (
    <TouchableOpacity onPress={handlePress}>
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
    </TouchableOpacity>
  );
}

export default HomeTaskOverview;
