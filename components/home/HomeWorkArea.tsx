import MainHeader from '@/components/common/MainHeader';
import Stack from '@/components/common/Stack';
import { colors } from '@/constants/Colors';
import dayjs from 'dayjs';
import React, { useMemo } from 'react';
import { ScrollView } from 'react-native';
import Container from '../common/Container';
import Row from '../common/Row';
import HomeJournalOverview from './HomeJournalOverview';
import HomeRemainingBudgetCard from './HomeRemainingBudgetCard';
import HomeSpentToday from './HomeSpentToday';
import HomeTaskOverview from './HomeTaskOverview';
import RecentTransactions from './RecentTransactions';

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
              <HomeJournalOverview />
            </Stack>
          </Row>
          <RecentTransactions />
        </Stack>
      </Container>
    </ScrollView>
  );
}

export default HomeWorkArea;
