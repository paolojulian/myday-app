import MainHeader from '@/components/common/MainHeader';
import Stack from '@/components/common/Stack';
import { colors } from '@/constants/Colors';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { ScrollView, View } from 'react-native';
import AppCard from '../common/AppCard';
import Container from '../common/Container';
import Row from '../common/Row';
import ThemedText from '../common/ThemedText';
import JournalIcon from '../common/icons/JournalIcon';
import HomeRemainingBudgetCard from './HomeRemainingBudgetCard';
import HomeSpentToday from './HomeSpentToday';
import RecentTransactions from './RecentTransactions';
import HomeTaskOverview from './HomeTaskOverview';

function HomeWorkArea() {
  const formattedDateToday = useMemo(() => dayjs().format('dddd, MMM D, YYYY'), []);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: colors.v2.black }}>
      <MainHeader subtitle={formattedDateToday} />
      <Container>
        <Stack style={{ gap: 40, flex: 1, paddingBottom: 24 }}>
          <Row style={{ gap: 8 }}>
            <Stack style={{ flex: 1, gap: 8 }}>
              <HomeRemainingBudgetCard />
              <HomeTaskOverview />
            </Stack>
            <Stack style={{ flex: 1, gap: 8 }}>
              <HomeSpentToday />
              <AppCard style={{ backgroundColor: colors.v2.red, height: 197 }}>
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
