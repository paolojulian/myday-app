import BentoCard from '@/components/common/BentoCard';
import Stack from '@/components/common/Stack';
import ThemedText from '@/components/common/ThemedText';
import ThemedView from '@/components/common/ThemedView';
import { colors } from '@/constants/Colors';
import { useTotalExpenses } from '@/hooks/services/expense/useTotalExpenses';
import { toLocaleCurrencyFormat } from '@/utils/currency/currency.utils';
import { useFocusEffect } from 'expo-router';
import { useMemo } from 'react';
import { Image } from 'react-native';

export default function TotalSpentTodayCard() {
  const today = useMemo(() => new Date(), []);

  const { data: totalExpensesToday, refetch: refetchTotalExpenses } = useTotalExpenses({
    transactionDate: today,
    type: 'daily',
  });

  useFocusEffect(() => {
    refetchTotalExpenses();
  });

  const spentToday = {
    color: totalExpensesToday > 0 ? colors.red : colors.black,
    text:
      totalExpensesToday > 0
        ? `-${toLocaleCurrencyFormat(totalExpensesToday)}`
        : toLocaleCurrencyFormat(totalExpensesToday),
  };

  return (
    <BentoCard>
      <Stack style={{ gap: 16, alignItems: 'center', justifyContent: 'flex-end' }}>
        <ThemedView style={{ marginTop: 16 }}>
          <Image source={require('../../../assets/images/total-spent-today.png')} />
        </ThemedView>
        <Stack style={{ alignItems: 'center' }}>
          <ThemedText variant="heading" style={{ color: spentToday.color }}>
            {spentToday.text}
          </ThemedText>
          <ThemedText variant="body">Total Spent Today</ThemedText>
        </Stack>
      </Stack>
    </BentoCard>
  );
}
