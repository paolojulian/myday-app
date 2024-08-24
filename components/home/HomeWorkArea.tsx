import MainHeader from '@/components/common/MainHeader';
import Stack from '@/components/common/Stack';
import { colors } from '@/constants/Colors';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import Row from '../common/Row';
import ThemedText from '../common/ThemedText';
import ChartPieIcon from '../common/icons/ChartPieIcon';
import AppCard from '../common/AppCard';
import MoneyIcon from '../common/icons/MoneyIcon';
import JournalIcon from '../common/icons/JournalIcon';
import RecentTransactions from './RecentTransactions';
import Container from '../common/Container';

function HomeWorkArea() {
  const formattedDateToday = useMemo(() => dayjs().format('dddd, MMM D, YYYY'), []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.v2.black }}>
      <MainHeader subtitle={formattedDateToday} />
      <Container>
        <Stack style={{ gap: 40, flex: 1, paddingBottom: 24 }}>
          <Row style={{ gap: 8 }}>
            <Stack style={{ flex: 1, gap: 8 }}>
              <AppCard
                style={{
                  backgroundColor: colors.v2.teal,
                  height: 197,
                }}
              >
                <Stack style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <View style={{ marginBottom: 16 }}>
                    <ChartPieIcon />
                  </View>
                  <View style={{ alignItems: 'center', gap: 8 }}>
                    <ThemedText variant="header-lg" color="inverted">
                      $9,000
                    </ThemedText>
                    <ThemedText variant="title-sm" color="inverted">
                      Remaining Budget
                    </ThemedText>
                  </View>
                </Stack>
              </AppCard>
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
                      4
                    </ThemedText>
                    <ThemedText variant="title-sm" color="inverted">
                      Tasks Today
                    </ThemedText>
                  </View>
                  <View style={{ alignItems: 'center', gap: 8 }}>
                    <ThemedText variant="header-lg" color="inverted">
                      12
                    </ThemedText>
                    <ThemedText variant="title-sm" color="inverted">
                      Overdue
                    </ThemedText>
                  </View>
                </Stack>
              </AppCard>
            </Stack>
            <Stack style={{ flex: 1, gap: 8 }}>
              <AppCard
                style={{
                  backgroundColor: colors.v2.red,
                  height: 240,
                }}
              >
                <Stack style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <View style={{ marginBottom: 16 }}>
                    <MoneyIcon />
                  </View>
                  <View style={{ alignItems: 'center', gap: 8 }}>
                    <ThemedText variant="header-lg" color="inverted">
                      -$1,200
                    </ThemedText>
                    <ThemedText variant="title-sm" color="inverted">
                      Spent Today
                    </ThemedText>
                  </View>
                </Stack>
              </AppCard>
              <AppCard style={{ backgroundColor: colors.v2.orange, height: 197 }}>
                <Stack style={{ justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                  <View style={{ marginBottom: 16 }}>
                    <JournalIcon />
                  </View>

                  <ThemedText variant="title-sm" color="inverted" style={{ textAlign: 'center' }}>
                    Start Journal for Today
                  </ThemedText>
                </Stack>
              </AppCard>
            </Stack>
          </Row>
          <RecentTransactions />
        </Stack>
      </Container>
    </ScrollView>
  );
}

export default HomeWorkArea;
