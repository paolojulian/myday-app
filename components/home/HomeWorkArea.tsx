import Stack from '@/components/common/Stack';
import MainHeader from '@/components/common/MainHeader';
import { colors } from '@/constants/Colors';
import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import dayjs from 'dayjs';

function HomeWorkArea() {
  const formattedDateToday = useMemo(() => dayjs().format('dddd, MMM D, YYYY'), []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.v2.black }}>
      <MainHeader subtitle={formattedDateToday} />
      <Stack style={{ gap: 8, flex: 1, paddingBottom: 24 }}>
        {/* <TasksOverview />
        <BudgetOverview />
        <PriorityTaskList />
        <RecentTransactions /> */}
      </Stack>
    </ScrollView>
  );
}

export default HomeWorkArea;
