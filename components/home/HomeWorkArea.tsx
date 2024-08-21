import MainHeader from '@/components/common/MainHeader';
import Stack from '@/components/common/Stack';
import { colors } from '@/constants/Colors';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import Row from '../common/Row';
import ThemedText from '../common/ThemedText';
import ChartPieIcon from '../common/icons/ChartPieIcon';

function HomeWorkArea() {
  const formattedDateToday = useMemo(() => dayjs().format('dddd, MMM D, YYYY'), []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.v2.black }}>
      <MainHeader subtitle={formattedDateToday} />
      <Stack style={{ gap: 8, flex: 1, paddingBottom: 24 }}>
        <Row style={{ gap: 8 }}>
          <Stack style={{ flex: 1, gap: 8 }}>
            <View
              style={{ borderRadius: 56, backgroundColor: colors.v2.teal, padding: 8, height: 197 }}
            >
              <Stack style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <View style={{ marginBottom: 8 }}>
                  <ChartPieIcon />
                </View>
                <ThemedText variant="header-lg" color="inverted">
                  $9,000
                </ThemedText>
                <ThemedText variant="title-sm" color="inverted">
                  Remaining Budget
                </ThemedText>
              </Stack>
            </View>
            <View
              style={{
                borderRadius: 56,
                backgroundColor: colors.v2.yellow,
                padding: 8,
                height: 240,
              }}
            ></View>
          </Stack>
          <Stack style={{ flex: 1, gap: 8 }}>
            <View
              style={{
                borderRadius: 56,
                backgroundColor: colors.v2.orange,
                padding: 8,
                height: 240,
              }}
            ></View>
            <View
              style={{ borderRadius: 56, backgroundColor: colors.v2.red, padding: 8, height: 197 }}
            ></View>
          </Stack>
        </Row>
        {/* <TasksOverview />
        <BudgetOverview />
        <PriorityTaskList />
        <RecentTransactions /> */}
      </Stack>
    </ScrollView>
  );
}

export default HomeWorkArea;
